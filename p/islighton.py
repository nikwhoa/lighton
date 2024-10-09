from pythonping import ping
import json
from datetime import datetime

office_ip = '0.0.0.0'
home_ip = '0.0.0.0'

dt = datetime.now()
time = [dt.hour, dt.minute, dt.second]



if ping(office_ip, verbose=False, count=10).success():
    print('light is on')
    with open('islighton.json', 'w') as f:
        json.dump({'islighton': True,  'hours': dt.hour,
                   'minutes': dt.minute, 'seconds': dt.second}, f)
else:
    print('light is off')
    with open('islighton.json', 'w') as f:
        json.dump(
            {'islighton': False, 'hours': dt.hour,
             'minutes': dt.minute, 'seconds': dt.second}, f)


