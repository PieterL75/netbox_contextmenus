const nbtn_views = {
    '/dcim/devices/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Interfaces': ['interfaces/', 'mdi-dots-vertical'],
        'Console Ports': ['console-ports/', 'mdi-dots-vertical'],
        'Power Ports': ['power-ports/', 'mdi-dots-vertical'],
        'Inventory': ['inventory/', 'mdi-dots-vertical'],
        'Status': ['status/', 'mdi-dots-vertical'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/dcim/racks/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Devices': ['/dcim/devices/?rack_id=$id$', 'mdi-dots-vertical'],
        'Power Feeds': ['/dcim/power-feeds/?rack_id=$id$', 'mdi-dots-vertical'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/ipam/ip-addresses/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/ipam/prefixes/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Child Prefixes': ['prefixes/', 'mdi-chart-pie'],
        'Child IPranges': ['ip-ranges/', 'mdi-barcode'],
        'IP Addresses': ['ip-addresses/', 'mdi-dots-vertical'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/ipam/aggregates/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Prefixes': ['/ipam/prefixes/?within_include=$obj$', 'mdi-chart-pie'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/ipam/vrfs/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Prefixes': ['/ipam/prefixes/?vrf_id=$id$', 'mdi-dots-horizontal'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/ipam/vlans/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Prefixes': ['/ipam/prefixes/?vrf_id=$id$', 'mdi-dots-horizontal'],
        'Device Interfaces': ['interfaces/', 'mdi-chart-pie'],
        'VM Interfaces': ['vm-interfaces/', 'mdi-barcode'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/ipam/vlan-groups/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'VLANs': ['/ipam/vlans/?group_id=$id$', 'mdi-dots-horizontal'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/tenancy/tenants/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'VLANs': ['/ipam/vlans/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Prefixes': ['/ipam/prefixes/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Devices': ['/dcim/devices/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'VMs': ['/virtualization/virtual-machines/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
    '/tenancy/tenant-groups/': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
};


function nbtnHideBox() {
    document.getElementById("nbtnboxmenu").style.display = "none"
}

function nbtnShowbox(e) {
    e.preventDefault();

    var nbtnboxmenu = document.getElementById("nbtnboxmenu");
    if (nbtnboxmenu) {
        var url = new URL(e.currentTarget.url)
        var nbtnboxpos = e.currentTarget.getBoundingClientRect();
        var urlpath = url.pathname;
        var parts = urlpath.split('/');
        var id = parts[3];
        var objtext = e.relatedTarget.innerText;
        var nbtnmenu = nbtnboxmenu.getElementsByClassName('nbtn-menu')[0]
        nbtnmenu.innerHTML = '';
        for (const view of Object.keys(nbtn_views)) {
            if (urlpath.startsWith(view)) {
                for (const items of Object.keys(nbtn_views[view])) {
                    var newurl = new URL(url);
                    var viewitem = nbtn_views[view][items][0];
                    var uri = viewitem.split('?');
                    if (viewitem.startsWith('/')) {
                        newurl.pathname = uri[0];
                    } else {
                        newurl.pathname += uri[0];
                    }
                    if (uri.length>1) {
                        for (var vars of uri[1].split('&')) {
                            vars = vars.split(/=(.+)/)
                            newurl.searchParams.set(vars[0], vars[1].replace('$id$', id).replace('$obj$', objtext).replace('$current_url$',window.location.href));
                        }
                    }
                    nbtnmenu.innerHTML += '<li class="list-group-item list-group-item-action' + (items == 'Delete' ? ' trash' : '') + '"><a href="' + newurl + '"><i class="mdi ' + nbtn_views[view][items][1] + '"></i> ' + items + '</a></li>';
                }
            }
        }

        nbtnboxmenu.style.display = "block";

        var menuWidth = nbtnboxmenu.offsetWidth + 8;
        var menuHeight = nbtnboxmenu.offsetHeight + 8;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        if ((windowWidth - nbtnboxpos.x) < menuWidth) {
            nbtnboxmenu.style.left = windowWidth - menuWidth + (nbtnboxpos.width * -0.05) + "px";
        } else {
            nbtnboxmenu.style.left = nbtnboxpos.x + (nbtnboxpos.width * -0.05) + "px";
        }

        if ((windowHeight - nbtnboxpos.y) < menuHeight) {
            nbtnboxmenu.style.top = windowHeight - menuHeight - 5 + "px";
        } else {
            nbtnboxmenu.style.top = nbtnboxpos.y - 5 + "px";
        }
    }
}

(function () {
    'use strict';

    var css=[
        '.nbtn-box { white-space: nowrap; display: inline-flex; }',
        '.nbtn-icon { padding:.1rem .1rem; margin-left: .2rem; white-space: nowrap; opacity: 20%; }',
        '.nbtn-icon:hover { opacity: 80%; }',
        '.nbtn-context-menu { position: absolute !important; padding:2px; }',
        '.nbtn-menu { margin: 0; list-style: none; display: flex;  flex-direction: column; padding: 5px 0; }',
        '.nbtn-menu > li { padding: 0px !important; border: none  !important; font-size: 1em}',
        '.nbtn-menu > li > a {  text-decoration: unset;   padding: 1px;   width: 100%;  display: flex;  transition: 0.5s linear;  -webkit-transition: 0.5s linear;  -moz-transition: 0.5s linear;  -ms-transition: 0.5s linear;  -o-transition: 0.5s linear;}',
        '.nbtn-menu > li > a > i {  padding-right: 10px; }',
        '.nbtn-menu > li.trash > a:hover {  color: red; }',
    ]
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css.join("\r\n")));
        head.appendChild(style);
    }

    var nbtnboxmenu = document.createElement("div");
    nbtnboxmenu.id = "nbtnboxmenu";
    nbtnboxmenu.className = "card nbtn-context-menu";
    nbtnboxmenu.style = "display: none";
    var nbtnboxmenuul = nbtnboxmenu.appendChild(document.createElement("ul"));
    nbtnboxmenuul.className="list-group nbtn-menu";
    document.body.appendChild(nbtnboxmenu);
    nbtnboxmenu.addEventListener('mouseleave', function (e) {
        nbtnHideBox(e)
    }, false);

    var classes = ['table']
    var i, j, k;

    for (k = 0; k < classes.length; k++) {
        var divs = document.getElementsByClassName(classes[k]);
        for (i = 0; i < divs.length; i++) {
            var links = divs[i].getElementsByTagName('a');
            for (j = 0; j < links.length; j++) {
                var link = links[j];
                var uri = link.getAttribute("href")
                var parts = uri.split('/');
                var id = parts[3];
                var action = parts[4];
                if (!isNaN(0 + id) && !action && link.getElementsByTagName('i').length == 0 && link.innerText.trim().length > 0) {
                    // only add the menuicon to links that:
                    //  - the id (3th part of the urlpath) has to be a number (excludes the generic urls)
                    //  - the action (4th part of the urlpath) has to be empty (excludes the action buttons)
                    //  - there should be no <i> tag in the ahref (those are the bullets for intended ip/prefix/vlan/...)
                    //  - the ahref innerhtml is not empty.
                    for (const view of Object.keys(nbtn_views)) {
                        if (uri.startsWith(view)) {
                            // only add the menuicon to links that:
                            //  - start with the nbtn_views key

                            var nbtnbox = link.appendChild(document.createElement("div"));
                            nbtnbox.className = "nbtn-box";
                            var nbtnspan = nbtnbox.appendChild(document.createElement("span"));
                            nbtnspan.id = "nbtnbox";
                            nbtnspan.className = "btn btn-sm nbtn-icon";
                            nbtnspan.title = "Actions";
                            var nbtnspani=nbtnspan.appendChild(document.createElement("i"));
                            nbtnspani.className="mdi mdi-menu";

                            link.style['white-space'] = 'nowrap';

                            nbtnbox.addEventListener('mouseover', function (e) {
                                nbtnShowbox(e)
                            }, false);
                            nbtnbox.url = link.href;
                            break;
                        }
                    }
                }
            }
        }
    }
})();
