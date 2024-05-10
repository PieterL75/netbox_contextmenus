import codecs
import os.path

from setuptools import find_packages, setup


with open("README.md", "r") as fh:
    long_description = fh.read()


def read(rel_path):
    here = os.path.abspath(os.path.dirname(__file__))
    with codecs.open(os.path.join(here, rel_path), 'r') as fp:
        return fp.read()


def get_pluginvar(variable,rel_path):
    for line in read(rel_path).splitlines():
        if line.startswith(f'__{variable}__'):
            delim = '"' if '"' in line else "'"
            return line.split(delim)[1]
    else:
        raise RuntimeError(f"Unable to find {variable} string in f{rel_path}.")


setup(
    name=get_pluginvar('name','netbox_contextmenus/pluginvars.py'),
    version=get_pluginvar('version','netbox_contextmenus/pluginvars.py'),
    description=get_pluginvar('description','netbox_contextmenus/pluginvars.py'),
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=get_pluginvar('url','netbox_contextmenus/pluginvars.py'),
    author=get_pluginvar('author','netbox_contextmenus/pluginvars.py'),
    author_email=get_pluginvar('author_email','netbox_contextmenus/pluginvars.py'),
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Framework :: Django',
        'Programming Language :: Python :: 3',
    ]
)