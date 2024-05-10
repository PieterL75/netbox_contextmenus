# netbox_contextmenus
Add context buttons to the links, making navigating in netbox less clicky

![nbcm1](docs/nbcm3.png)

![nbcm2](docs/nbcm4.png)

The menu items can easliy be personalised

## Installation:

- install as a any regular plugin.  See  [https://docs.netbox.dev/en/stable/plugins/installation/](https://docs.netbox.dev/en/stable/plugins/installation/)
- PyPi Packagename is 'netbox-contextmenus'.
- NetBox packagenam is 'netbox_contextmenus'.
- Remove (delete, remark) BANNER_BOTTOM from the configuration file. If you need to set a bottom banner, then use the ConfigurationRevisions of NetBox [https://docs.netbox.dev/en/stable/configuration/#dynamic-configuration-parameters](https://docs.netbox.dev/en/stable/configuration/#dynamic-configuration-parameters)
- run a collect static `/opt/netbox/venv/bin/python3 manage.py collectstatic --no-input`
- restart the netbox service
