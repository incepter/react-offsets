import React from 'react';

function safelyCloneAndGetOffsets(node) {
    const innerText = node?.innerText;
    const temporaryNode = node.cloneNode();
    temporaryNode.innerText = innerText;
    temporaryNode.style.display = 'block';
    document.body.appendChild(temporaryNode);
    const { offsetWidth, offsetHeight } = temporaryNode;
    document.body.removeChild(temporaryNode);
    return { offsetWidth, offsetHeight };
}

function getNodeOffsets(node) {
    return {
        offsetWidth: node?.offsetWidth || 0,
        offsetHeight: node?.offsetHeight || 0,
    };
}

/**
 * returns the offsetWidth and offsetWidth if they are both present
 * else clones the node and get it's offsetWidth and height then deletes it.
 * @param node : NODE
 * @returns {undefined|{offsetHeight: *, offsetWidth: *}}
 */
export function getInvisibleNodeOffsets(node) {
    if (!node) {
        return undefined;
    }
    const { offsetWidth, offsetHeight } = node;
    if (offsetWidth && offsetHeight) {
        return { offsetWidth, offsetHeight };
    }
    const cloneOffsets = safelyCloneAndGetOffsets(node);
    return {
        offsetWidth: offsetWidth || cloneOffsets.offsetWidth,
        offsetHeight: offsetHeight || cloneOffsets.offsetHeight,
    };
}

function areOffsetsZero(offsets) {
    return offsets.offsetWidth === 0 && offsets.offsetHeight === 0;
}

function areOffsetsEqual(o1, o2) {
    return (
        o1.offsetWidth === o2.offsetWidth && o1.offsetHeight === o2.offsetHeight
    );
}

/**
 * @param ref : a REACT_REF
 * @returns {{offsetHeight: (*|number), offsetWidth: (*|number)}}
 */
function useNodeOffsets(ref) {
    const realNodeOffsets = getNodeOffsets(ref.current);
    const [nodeOffsets, setNodeOffsets] = React.useState(realNodeOffsets);
    React.useLayoutEffect(() => {
        const node = ref.current;
        const innerText = node?.innerText;
        // this means, it contains text but invisible (offsets === 0)
        if (areOffsetsZero(nodeOffsets) && innerText?.length > 0) {
            const offsets = getInvisibleNodeOffsets(ref.current);
            if (!areOffsetsEqual(offsets, nodeOffsets)) {
                setNodeOffsets(offsets);
            }
        }
    }, []);
    return nodeOffsets;
}

export default useNodeOffsets;
