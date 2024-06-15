set -eux

virtualenv /tmp/venv_hackathon
source /tmp/venv_hackathon/bin/activate
pip3 install -r requirements.txt
flask --app app run