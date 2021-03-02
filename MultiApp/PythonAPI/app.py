from flask import Flask
from flask.wrappers import Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return Response(
        json.dumps(
            {
                'message': 'Python Api is up and runnning.'
            }
        ),
        status=200,
        content_type="application/json"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
