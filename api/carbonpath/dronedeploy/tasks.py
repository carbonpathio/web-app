from config.celery_app import app as celery_app

from .utils import download_all_orthoimagery, fetch_and_create


@celery_app.task
def test_print_2():
    print("HELLO CELERY 2")
    return "HELLO CELERY 2"


@celery_app.task
def fetch_drone_deploy():
    return fetch_and_create()


@celery_app.task
def download_othroimagery():
    return download_all_orthoimagery()


@celery_app.task
def fetch_create_and_download():
    fetch_and_create()
    download_all_orthoimagery()
