from flask import Flask
from flask.wrappers import Response
import json

# print(__name__)
app = Flask(__name__)


@app.route("/")
def home():
    return Response(json.dumps({'message': 'Api is up and runnning.'}), status=200, content_type="application/json")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
