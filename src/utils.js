export function readPaginated(raw) {
    return raw.edges.filter(edge => !!edge).map(edge => edge.node);
}
