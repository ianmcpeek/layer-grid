import { useEffect, useState } from "react";

function runTasks(tasks: any[], t: number) {

    const now = Date.now();
    const active = tasks.filter(task => !task.done);
    active.forEach((task, i) => {
        if (task.scheduledFor <= t) {

            task.step(task.scheduledFor, t);
            if (task.isDone(task.scheduledFor, t)) {

                task.done = true;
            }
        }
    });

    return active;
}

type Task = {
    scheduledFor: number;
    done: boolean;
    step: (start: number, t: number) => void;
    isDone: (start: number, t: number) => boolean;
}

function useTaskScheduler() {
    const [t, setT] = useState(0);
    const [prevT, setPrevT] = useState(0);

    const [tasks, setTasks] = useState<Task[]>([]);

    // keep time up to date
    useEffect(() => {
        let frameId: number = 0;
        const frame = (time: number) => {
            setT(time);
            frameId = requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        return () => cancelAnimationFrame(frameId);
    }, []);

    useEffect(() => {
        if (t !== prevT) {
            setTasks(runTasks(tasks, t));
            setPrevT(t);
        }
    }, [t, prevT, tasks]);


    // if done is not passed, it is assumed to be one-time task
    function schedule(start: number, fnStep: (start: number, t: number) => void, fnDone?: (start: number, t: number) => boolean) {
        console.log('scheduling');

        setTasks([...tasks, {
            scheduledFor: start,
            step: fnStep,
            isDone: fnDone ? fnDone : () => (true),
            done: false,
        }]);
    }
    function scheduleMultiple(next: Task[]) {
        setTasks([...tasks, ...next]);
    }

    return {
        t,
        schedule,
        scheduleMultiple
    };
}

export default useTaskScheduler;