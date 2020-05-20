from flask import Blueprint

bp = Blueprint("sockets", __name__)

from . import events