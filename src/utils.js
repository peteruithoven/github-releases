export function readPaginated(raw) {
    return raw.edges.map(edge => edge.node);
}
