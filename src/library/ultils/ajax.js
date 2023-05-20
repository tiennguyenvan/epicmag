
export const updateGlobalQueryObjects = (type, objects) => {
    if (!window['dragblock-query-objects']) window['dragblock-query-objects'] = new Object();
    if (!window['dragblock-query-objects'][type]) window['dragblock-query-objects'][type] = new Object();
    for (let obj of objects) {
        window['dragblock-query-objects'][type][obj.id] = obj;
    }
}
export const getGlobalQueryObject = (type, id) => {
    if (!window['dragblock-query-objects']) window['dragblock-query-objects'] = new Object();
    if (!window['dragblock-query-objects'][type]) window['dragblock-query-objects'][type] = new Object();

    if (window['dragblock-query-objects'][type][id]) return window['dragblock-query-objects'][type][id]
    requestQueryObjects(type, [id]);

    return null;
}

export const requestQueryObjects = (type='categories', ids) => {        
    if (!ids || ids.length === 0) return;
    // check if we loaded these
    if (!window['dragblock-query-loaded-ids']) window['dragblock-query-loaded-ids'] = {}
    if (!window['dragblock-query-loaded-ids'][type]) window['dragblock-query-loaded-ids'][type] = new Set();

    let found_new = false;
    let requestIds = []
    for (let id of ids) {
        if (!window['dragblock-query-loaded-ids'][type].has(id)) {
            found_new = true;
            window['dragblock-query-loaded-ids'][type].add(id)
            requestIds.push(id);
        }
    }
    if (!found_new) return;

    wp.apiFetch({        
        path: `/wp/v2/${type}?include=${requestIds.join(",")}`,
    }).then((objects) => {
        updateGlobalQueryObjects(type, objects);
    })
};