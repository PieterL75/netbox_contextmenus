const nbcm_opendelay = {{ opendelay }}; // Menu opening delay in milliseconds
const nbcm_views_all = {    // Menu items shown on all models
    'pre': {
        'View': ['', 'mdi-share'],
        'Edit': ['edit/?return_url=$current_url$', 'mdi-pencil'],
        'To Clipboard': ['#copy', 'mdi-content-copy']
    },
    'post': {
        'Delete': ['delete/?return_url=$current_url$', 'mdi-delete'],
    },
}
const nbcm_views = {        // Menu items per model. The model has to be present to get the defaults.
    '/circuits/circuit-terminations/' : {
        'Trace': ['/dcim/circuit-terminations/$id$/trace/', 'mdi-transit-connection-variant'],
    },
    '/circuits/circuits/' : {
    },
    '/circuits/providers/' : {
    },
    '/dcim/cables/' : {
    },
    '/dcim/device-types/': {
        'Interfaces': ['interfaces/', 'mdi-dots-vertical'],
        'Console Ports': ['console-ports/', 'mdi-dots-vertical'],
        'Power Ports': ['power-ports/', 'mdi-dots-vertical'],
        'Front Ports': ['front-ports/', 'mdi-dots-vertical'],
        'Rear Ports': ['rear-ports/', 'mdi-dots-vertical'],
        'Console Server Ports': ['console-serves-ports/', 'mdi-dots-vertical'],
        'Power Outlets': ['power-outlets/', 'mdi-dots-vertical'],
        'Device Bays': ['device-bays/', 'mdi-dots-vertical'],
    },
    '/dcim/devices/': {
        'Interfaces': ['interfaces/', 'mdi-dots-vertical'],
        'Console Ports': ['console-ports/', 'mdi-dots-vertical'],
        'Power Ports': ['power-ports/', 'mdi-dots-vertical'],
        'Inventory': ['inventory/', 'mdi-dots-vertical'],
        'Status': ['status/', 'mdi-dots-vertical'],
        'SSH': ['ssh://$obj$', 'mdi-monitor-lock', '_blank'],
        'HTTPS': ['https://$obj$', 'mdi-cloud-lock', '_blank'],
    },
    '/dcim/front-ports/': {
        'Trace': ['/dcim/front-ports/$id$/trace/', 'mdi-transit-connection-variant'],
    },
    '/dcim/interfaces/': {
        'Trace': ['/dcim/interfaces/$id$/trace/', 'mdi-transit-connection-variant'],
        'Create IP': ['/ipam/ip-addresses/add/?interface=$id$', 'mdi-plus-thick'],
        'Assign IP': ['/ipam/ip-addresses/assign/?interface=$id$', 'mdi-plus-thick'],
    },
    '/dcim/racks/': {
        'Devices': ['/dcim/devices/?rack_id=$id$', 'mdi-dots-vertical'],
        'Power Feeds': ['/dcim/power-feeds/?rack_id=$id$', 'mdi-dots-vertical'],
    },
    '/dcim/rear-ports/': {
        'Trace': ['/dcim/rear-ports/$id$/trace/', 'mdi-transit-connection-variant'],
    },
    '/ipam/aggregates/': {
        'Prefixes': ['/ipam/aggregates/$id$/prefixes', 'mdi-chart-pie'],
    },
    '/ipam/ip-addresses/': {
        'Parent Prefix': ['/ipam/prefixes/?contains=$obj$', 'mdi-dots-vertical'],
        'SSH': ['ssh://$obj_ip$', 'mdi-monitor-lock', '_blank'],
        'HTTPS': ['https://$obj_ip$', 'mdi-cloud-lock', '_blank'],
    },
    '/ipam/prefixes/': {
        'Child Prefixes': ['prefixes/', 'mdi-chart-pie'],
        'Child IPranges': ['ip-ranges/', 'mdi-barcode'],
        'IP Addresses': ['ip-addresses/', 'mdi-dots-vertical'],
    },
    '/ipam/vlan-groups/': {
        'VLANs': ['/ipam/vlans/?group_id=$id$', 'mdi-dots-horizontal'],
    },
    '/ipam/vlans/': {
        'Prefixes': ['/ipam/prefixes/?vrf_id=$id$', 'mdi-dots-horizontal'],
        'Device Interfaces': ['interfaces/', 'mdi-chart-pie'],
        'VM Interfaces': ['vm-interfaces/', 'mdi-barcode'],
    },
    '/ipam/vrfs/': {
        'Prefixes': ['/ipam/prefixes/?vrf_id=$id$', 'mdi-dots-horizontal'],
    },
    '/tenancy/tenant-groups/': {
    },
    '/tenancy/tenants/': {
        'VLANs': ['/ipam/vlans/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Prefixes': ['/ipam/prefixes/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'Devices': ['/dcim/devices/?tenant_id=$id$', 'mdi-dots-horizontal'],
        'VMs': ['/virtualization/virtual-machines/?tenant_id=$id$', 'mdi-dots-horizontal'],
    },
    '/virtualization/clusters' : {
        'VMs': ['virtual-machines/', 'mdi-dots-horizontal'],
        'Devices': ['devices/', 'mdi-dots-horizontal'],
    },
    '/virtualization/virtual-machines': {
        'Interfaces': ['interfaces/', 'mdi-chart-pie'],
        'SSH': ['ssh://$obj$', 'mdi-monitor-lock', '_blank'],
        'HTTPS': ['https://$obj$', 'mdi-cloud-lock', '_blank'],
    },
};

var nbcmopentimeout;

function nbcmHideBox() {
    document.getElementById("nbcmboxmenu").style.display = "none"
}

function nbcmShowbox(currentTarget, relatedTarget) {
    //e.preventDefault();

    var nbcmboxmenu = document.getElementById("nbcmboxmenu");
    if (nbcmboxmenu) {
        var current_url = window.location.pathname + window.location.search + window.location.hash
        var url = new URL(currentTarget.url)
        var nbcmboxpos = currentTarget.getBoundingClientRect();
        var urlpath = url.pathname;
        var parts = urlpath.split('/');
        var id = parts[3];
        var objtext = relatedTarget.innerText;
        var nbcmmenu = nbcmboxmenu.getElementsByClassName('nbcm-menu')[0]
        nbcmmenu.innerHTML = '';
        for (const view of Object.keys(nbcm_views)) {
            if (urlpath.startsWith(view)) {
                var nbcm_view_full= {
                    ...nbcm_views_all['pre'],
                    ...nbcm_views[view],
                    ...nbcm_views_all['post'],
                }
                for (const item of Object.keys(nbcm_view_full)) {
                    var newurl = new URL(url);
                    var viewitem = nbcm_view_full[item];
                    var uri = viewitem[0].split('?');
                    var displayitem = item;
                    var urltarget = ''
                    if (viewitem.length>2) {
                        urltarget = viewitem[2]
                        displayitem = displayitem + ' <i class="mdi mdi-open-in-new" style="margin-left:0.2em"></i>'
                    }    
                    if (viewitem[0] == '#copy') {
                        newurl='#" onclick="window.navigator.clipboard.writeText(\''+objtext.replace("'","\\'")+'\')'
                    } else if (viewitem[0].startsWith('/')) {
                        newurl.pathname = uri[0].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url);
                    } else if (viewitem[0].includes('://')) {
                        newurl = uri[0].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url);
                    } else {
                        newurl.pathname += uri[0];
                    }
                    if (uri.length>1) {
                        for (var vars of uri[1].split('&')) {
                            vars = vars.split(/=(.+)/)
                            newurl.searchParams.set(vars[0], vars[1].replace('$id$', id).replace('$obj_ip$', objtext.split('/')[0]).replace('$obj$', objtext).replace('$current_url$',current_url));
                        }
                    }
                    nbcmmenu.innerHTML += '<li class="list-group-item list-group-item-action' + (item == 'Delete' ? ' trash' : '') + '"><a href="' + newurl + '"' + (urltarget != '' ? ' target="'+urltarget+'"' : '') + '><i class="mdi ' + viewitem[1] + '"></i> ' + displayitem + '</a></li>';
                }
            }
        }

        nbcmboxmenu.style.display = "block";

        var menuWidth = nbcmboxmenu.offsetWidth + 8;
        var menuHeight = nbcmboxmenu.offsetHeight + 8;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        if ((windowWidth - nbcmboxpos.x) < menuWidth) {
            nbcmboxmenu.style.left = windowWidth - menuWidth + (nbcmboxpos.width * -0.05) + "px";
        } else {
            nbcmboxmenu.style.left = nbcmboxpos.x + (nbcmboxpos.width * -0.05) + "px";
        }

        if ((windowHeight - nbcmboxpos.y) < menuHeight) {
            nbcmboxmenu.style.top = windowHeight - menuHeight - 5 + "px";
        } else {
            nbcmboxmenu.style.top = nbcmboxpos.y - 5 + "px";
        }
    }
}

function nbcm_add_burgers() {
    'use strict';

    var css=[
        '.nbcm-box { white-space: nowrap; display: inline-flex; }',
        '.nbcm-icon { padding:.1rem .1rem; margin-left: .2rem; white-space: nowrap; opacity: 20%; line-height: 0 !important; }',
        '.nbcm-icon:hover { opacity: 80%; }',
        '.nbcm-context-menu { position: absolute !important; padding:2px; }',
        '.nbcm-menu { margin: 0; list-style: none; display: flex;  flex-direction: column; padding: 5px 0; }',
        '.nbcm-menu > li { padding: 0px !important; border: none  !important; font-size: 1em}',
        '.nbcm-menu > li > a {  text-decoration: unset;   padding: 1px;   width: 100%;  display: flex;  transition: 0.5s linear;  -webkit-transition: 0.5s linear;  -moz-transition: 0.5s linear;  -ms-transition: 0.5s linear;  -o-transition: 0.5s linear;}',
        '.nbcm-menu > li > a > i {  padding-right: 10px; }',
        '.nbcm-menu > li.trash > a:hover {  color: red; }',
    ]
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        var style = document.createElement('style');
        //style.type = 'text/css';
        style.appendChild(document.createTextNode(css.join("\r\n")));
        head.appendChild(style);
    }

    var nbcmboxmenu = document.createElement("div");
    nbcmboxmenu.id = "nbcmboxmenu";
    nbcmboxmenu.className = "card nbcm-context-menu";
    nbcmboxmenu.style = "display: none";
    var nbcmboxmenuul = nbcmboxmenu.appendChild(document.createElement("ul"));
    nbcmboxmenuul.className="list-group nbcm-menu";
    document.body.appendChild(nbcmboxmenu);
    nbcmboxmenu.addEventListener('mouseleave', function (e) {
        clearTimeout(globalThis.nbcmopentimeout);
        nbcmHideBox(e)
    }, false);

    var classes = ['table']
    var i, j, k;
    const nbcm_views_keys = Object.keys(nbcm_views)

    for (k = 0; k < classes.length; k++) {
        var divs = document.getElementsByClassName(classes[k]);
        for (i = 0; i < divs.length; i++) {
            var links = divs[i].getElementsByTagName('a');
            for (j = 0; j < links.length; j++) {
                var link = links[j];
                var uri = link.getAttribute("href");
                if (uri == null) continue;
                var parts = uri.split('/');
                var id = parts[3];
                var action = parts[4];
                if (!isNaN(0 + id) && !action && link.getElementsByTagName('i').length == 0 && link.textContent.trim().length > 0) {
                    // only add the menuicon to links that:
                    //  - the id (3th part of the urlpath) has to be a number (excludes the generic urls)
                    //  - the action (4th part of the urlpath) has to be empty (excludes the action buttons)
                    //  - there should be no <i> tag in the ahref (those are the bullets for intended ip/prefix/vlan/...)
                    //  - the ahref innerhtml is not empty.
                    for (const view of nbcm_views_keys) {
                        if (uri.startsWith(view)) {
                            // only add the menuicon to links that:
                            //  - start with the nbcm_views key
                            var frag = document.createDocumentFragment()
                            var nbcmbox = frag.appendChild(document.createElement("div"));
                            nbcmbox.className = "nbcm-box";
                            var nbcmspan = nbcmbox.appendChild(document.createElement("span"));
                            nbcmspan.id = "nbcmbox";
                            nbcmspan.className = "btn btn-sm nbcm-icon";
                            nbcmspan.title = "Actions";
                            var nbcmspani=nbcmspan.appendChild(document.createElement("i"));
                            nbcmspani.className="mdi mdi-menu";
                            
                            link.appendChild(frag)

                            link.style['white-space'] = 'nowrap';

                            nbcmbox.addEventListener('mouseover', function (e) {
                                var currentTarget = e.currentTarget;
                                var relatedTarget = e.relatedTarget;

                                clearTimeout(globalThis.nbcmopentimeout);
                                globalThis.nbcmopentimeout = setTimeout(function() {
                                    nbcmShowbox(currentTarget, relatedTarget)
                                }, nbcm_opendelay);
                            }, false);
                            
                            nbcmbox.addEventListener('mouseleave', function (e) {
                                clearTimeout(globalThis.nbcmopentimeout);
                            }, false);
                        
                            nbcmbox.url = link.href;
                            break;
                        }
                    }
                }
            }
        }
    }
}

nbcm_add_burgers();

// Repaint after the tables are updated (ex QuickSearch or nbr items per page change)
const nbcm_targetNode = document.getElementById('object_list');
if (nbcm_targetNode) {
    const nbcm_observerconfig = { childList: true, subtree: true };
    const nbcm_observer = new MutationObserver(nbcm_add_burgers);
    nbcm_observer.observe(nbcm_targetNode, nbcm_observerconfig);
}

