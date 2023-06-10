import { useEffect, useState } from 'react';
import { LinkedList, ListNode } from '../../lib/utils/Graph';
import GraphUtil from '../../lib/utils/GraphUtil';
import { VerticalNodeMapProps } from './VerticalNodeMapTypes';

function VerticalNodeMap(props: VerticalNodeMapProps) {
    const [list, setList] = useState<LinkedList>();

    // using config construct a linked list of numbers from 1 to length

    useEffect(() => {
        setList(GraphUtil.makeLinkedListTo(props.config.length));
    }, [props.config.length]);

    function RenderList() {
        const nodes: any[] = [];

        if (list) {
            let curr: ListNode | undefined = list.head;

            while (curr !== undefined) {
                nodes.push(RenderGraphNode(curr.value, curr.value === props.lastVisited, props.fnNodeClicked));
                curr = curr.next;
                if (curr?.value === props.lastUnlocked + 1) break;
            }
        }
        return nodes;
    }

    function RenderGraphNode(value: number, selected: boolean, fnClick: Function) {
        return (
            <div id={'graphnode' + value} key={'graphnode' + value} style={
                {
                    position: 'absolute',
                    ...props.config.nodeStyle,
                    ...(selected ? props.config.selectedNodeStyle : undefined),
                    top: props.config.positions[value].top + 120,
                    left: props.config.positions[value].left - 40
                }// 0
            } onClick={() => fnClick(value)}>
                <span>{value + 1}</span>
            </div>
        );
    }

    return <div className='linked-list' style={{ position: 'relative' }}>{RenderList()}</div>;
}

export default VerticalNodeMap;