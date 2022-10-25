from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


def send_email(subject, to, from_email, template_name, context={}, filepath=None):

    plaintext = get_template(f"{template_name}.txt")
    html = get_template(f"{template_name}.html")

    text_content = plaintext.render(context)
    html_content = html.render({**context})

    msg = EmailMultiAlternatives(subject, text_content, from_email, to if type(to) is list else [to])
    msg.attach_alternative(html_content, "text/html")
    if filepath:
        msg.attach_file(filepath)
    msg.send()
