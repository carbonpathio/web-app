from drf_spectacular.utils import extend_schema, extend_schema_view
from dronedeploy.serializers import MapPlanOutputSerializer
from django.conf import settings

from .models import MapPlan, PanoPlan, PhotoPlan, VideoPlan
from .serializers import MapPlanSerializer, PanoPlanSerializer, PhotoPlanSerializer, VideoPlanSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models import Q

import requests
import zipfile
from io import BytesIO
from django.core.files import File
from PIL import Image

def fetch_and_create():
    print("dronedeploy: fetching data")
    r = requests.post(
        'https://www.dronedeploy.com/graphql', 
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {settings.DRONE_DEPLOY_API_KEY}'
        },
        json={
            "query": """
                    {
                    projects {
                        edges {
                        node {
                            plans {
                            edges {
                                node {
                                ... on MapPlan {
                                    id
                                    name
                                    geometry {
                                    lat
                                    lng
                                    }
                                }
                                ... on ProgressPhotoPlan {
                                    id
                                    name
                                    geometry {
                                    lat
                                    lng
                                    }
                                    photos {
                                        edges {
                                            node {
                                            id
                                            url
                                            }
                                        }
                                    }
                                }
                                ... on ProgressPanoPlan {
                                    id
                                    name
                                    downloadPath
                                    geometry {
                                    lat
                                    lng
                                    }
                                }
                                ... on ProgressVideoPlan {
                                    id
                                    name
                                    downloadPath
                                    geometry {
                                    lat
                                    lng
                                    }
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                """
        }
    )
    result = r.json()
    data = result["data"]["projects"]["edges"]
    plans = []
    map_plans = []
    pano_plans = []
    photo_plans = []
    video_plans = []
    new_map_plans = []
    new_pano_plans = []
    new_photo_plans = []
    new_video_plans = []

    for node in data:
        if node["node"]:
            innerNode = node["node"]["plans"]["edges"]
            for nodeItem in innerNode:
                if nodeItem["node"]:
                    plans.append(nodeItem["node"])

    for node in plans:
        if node["id"].startswith("MapPlan"):
            map_plans.append(node)
        if node["id"].startswith("ProgressPanoPlan") and node["downloadPath"] is not None:
            pano_plans.append(node)
        if node["id"].startswith("ProgressPhotoPlan") and node["photos"] is not None:
            photo_plans.append(node)
        if node["id"].startswith("ProgressVideoPlan") and node["downloadPath"] is not None:
            video_plans.append(node)

    print("dronedeploy: creating new objects")
        
    for node in map_plans:
        new_plan, created = MapPlan.objects.get_or_create(
            api_id=node["id"],
            name=node["name"],
            geometry=node["geometry"]
        )

        if created:
            new_map_plans.append(new_plan)

    for node in pano_plans:
        new_plan, created = PanoPlan.objects.get_or_create(
            api_id=node["id"],
            name=node["name"],
            geometry=node["geometry"],
            download_path=node["downloadPath"],
        )

        if created:
            new_pano_plans.append(new_plan)

    for node in photo_plans:
        urls = []
        for photo in node["photos"]["edges"]:
            urls.append(photo["node"]["url"])
        new_plan, created = PhotoPlan.objects.get_or_create(
            api_id=node["id"],
            name=node["name"],
            geometry=node["geometry"],
            download_path=urls,
        )

        if created:
            new_photo_plans.append(new_plan)

    for node in video_plans:
        new_plan, created = VideoPlan.objects.get_or_create(
            api_id=node["id"],
            name=node["name"],
            geometry=node["geometry"],
            download_path=node["downloadPath"],
        )

        if created:
            new_video_plans.append(new_plan)

    map_plan_set = MapPlan.objects.filter(id__in=[plan.id for plan in new_map_plans])
    map_plan_serializer = MapPlanSerializer(map_plan_set, many=True)

    pano_plan_set = PanoPlan.objects.filter(id__in=[plan.id for plan in new_pano_plans])
    pano_plan_serializer = PanoPlanSerializer(pano_plan_set, many=True)

    photo_plan_set = PhotoPlan.objects.filter(id__in=[plan.id for plan in new_photo_plans])
    photo_plan_serializer = PhotoPlanSerializer(photo_plan_set, many=True)

    video_plan_set = VideoPlan.objects.filter(id__in=[plan.id for plan in new_video_plans])
    video_plan_serializer = VideoPlanSerializer(video_plan_set, many=True)

    return { #only newly created plans in the response
        "MapPlans": map_plan_serializer.data,
        "PanoPlans": pano_plan_serializer.data,
        "PhotoPlans": photo_plan_serializer.data,
        "VideoPlans": video_plan_serializer.data
    }

def download_all_orthoimagery():
    print("dronedeploy: downloading all orthoimagery")
    Image.MAX_IMAGE_PIXELS=500000000 #For avoiding DecompressionBombError, since Map Plans export huge images.

    counter = 1
    for plan in MapPlan.objects.all():
        print(f"Progress: Plan {counter} of {MapPlan.objects.count()}")
        jpeg_flag = plan.jpeg_file != None and plan.jpeg_bounds != None
        geotiff_flag = plan.geotiff_file != None and plan.geotiff_bounds != None

        r = requests.post(
            'https://www.dronedeploy.com/graphql', 
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {settings.DRONE_DEPLOY_API_KEY}'
            },
            json={
                "query": """
                    {
                """+f'mapPlan(id: "{plan.api_id}") {{\n'+"""
                        exports {
                        edges {
                            node {
                            downloadPath
                            id
                            status
                            parameters {
                                projection
                                fileFormat
                            }
                            }
                        }
                        }
                    }
                    }
                """
            }
        )
        result = r.json()
        data = result["data"]["mapPlan"]["exports"]["edges"]
        for node in data:
            if geotiff_flag and jpeg_flag:
                break #skip if both files already exist in our database
            
            if node["node"]["parameters"]["fileFormat"] == "JPEG":
                download_path = node["node"]["downloadPath"]
                file_req = requests.get(download_path)
                with zipfile.ZipFile(BytesIO(file_req.content)) as f:
                    for target_file in f.namelist():

                        if target_file.endswith('jpg') or target_file.endswith('jpeg'):
                            with f.open(target_file) as jpeg_file:
                                with BytesIO() as buf: #write contents in a buffer and store in FileField
                                    buf.write(jpeg_file.read())
                                    buf.seek(0)
                                    file = File(buf, target_file)
                                    img = Image.open(file)

                                    #resize jpeg
                                    multiplier = (6000 / float(img.size[0]))
                                    new_height = int(( float(img.size[1]) * float(multiplier) ))
                                    img = img.resize((6000,new_height))

                                    #add alpha
                                    img = img.convert("RGBA")
                                    datas = img.getdata()
                                    pixel_counter = 1

                                    #make white pixels transparent
                                    newData = []
                                    for item in datas:
                                        #print(f"{pixel_counter} of {len(datas)} pixels")
                                        if item[0] == 255 and item[1] == 255 and item[2] == 255:
                                            newData.append((0, 0, 0, 0))
                                        else:
                                            newData.append(item)
                                        pixel_counter = pixel_counter + 1

                                    img.putdata(newData)
                                    newf = BytesIO()
                                    newfile = File(newf, f"{target_file}_edited")
                                    img.save(newfile, 'PNG')
                                    plan.jpeg_file = newfile
                                    plan.jpeg_download_path = download_path
                                    jpeg_flag = True
                                    plan.save()
                                    newf.close()

                        if target_file.endswith('kml'):
                            with f.open(target_file) as jpeg_bounds_file:
                                s = str(jpeg_bounds_file.read(), 'UTF-8')
                                bounds = { #get string between <north></north> etc. from kml file, store in JSONField
                                    "north": (s.split("<north>"))[1].split("</north>")[0],
                                    "south": (s.split("<south>"))[1].split("</south>")[0],
                                    "east": (s.split("<east>"))[1].split("</east>")[0],
                                    "west": (s.split("<west>"))[1].split("</west>")[0],
                                }
                                plan.jpeg_bounds = bounds
                                plan.save()
            
            if node["node"]["parameters"]["fileFormat"] == "GEO_TIFF":
                download_path = node["node"]["downloadPath"]
                file_req = requests.get(download_path)
                with zipfile.ZipFile(BytesIO(file_req.content)) as f:
                    for target_file in f.namelist():

                        if target_file.endswith('tif'):
                            with f.open(target_file) as tif_file:
                                with BytesIO() as buf: #write contents in a buffer and store in FileField
                                    buf.write(tif_file.read())
                                    buf.seek(0)
                                    file = File(buf, target_file)
                                    plan.geotiff_file = file
                                    plan.geotiff_download_path = download_path
                                    geotiff_flag = True
                                    plan.save()
                        
                        if target_file.endswith('kml'):
                            with f.open(target_file) as geotiff_bounds_file:
                                s = str(geotiff_bounds_file.read(), 'UTF-8')
                                bounds = { #get string between <north></north> etc. from kml file, store in JSONField
                                    "north": (s.split("<north>"))[1].split("</north>")[0],
                                    "south": (s.split("<south>"))[1].split("</south>")[0],
                                    "east": (s.split("<east>"))[1].split("</east>")[0],
                                    "west": (s.split("<west>"))[1].split("</west>")[0],
                                }
                                plan.geotiff_bounds = bounds
                                plan.save()
        counter = counter + 1
    return True