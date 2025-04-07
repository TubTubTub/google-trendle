from flask import Blueprint

healthcheck_blueprint = Blueprint('healthcheck', __name__)

@healthcheck_blueprint.get('/')
def probe_healthcheck():
    return 'success', 200