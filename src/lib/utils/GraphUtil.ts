import { LinkedList, ListNode } from "./Graph";

export default class GraphUtil {
    static makeLinkedListTo(index: number): LinkedList {
        const head: ListNode = { value: 0, next: undefined };
        if (index === 0) return { head };

        let i = 1;
        let curr = head;

        while (i < index) {
            curr.next = {
                value: i,
                next: undefined
            }
            curr = curr.next;
            i++;
        }

        return { head };

    }
}