import { useCallback, useEffect, useState } from "react";
import useTaskScheduler from "../lib/hooks/useTaskScheduler";
import { Colors } from "../lib/utils/ColorUtil";
import EasingUtil from "../lib/utils/EasingUtil";
import { MuteSoundIcon, SoundIcon } from "./Grid/SVGIcons";
const bounds = [0, 280];
const animLength = 1000;

function Anim() {
    const { t, schedule, scheduleMultiple } = useTaskScheduler();
    const [clicks, setClicks] = useState(0);
    const [muted, setMuted] = useState(true);

    const seconds = Math.floor(t / 1000);
    const min = Math.floor(t / (1000 * 60));
    const [reversed, setReversed] = useState({
        count: 0,
        reversed: false
    });


    const [x1, setX1] = useState(bounds[0]);
    const [x2, setX2] = useState(bounds[0]);
    const [x3, setX3] = useState(bounds[0]);
    const [volume, setVolume] = useState(0);
    const [pr, setPr] = useState(0);
    const moveBall = (setVal: Function, easing: (t: number) => number) => {
        return (start: number, t: number) => {
            const progress = (t > start + animLength) ? 1 : (t - start) / animLength;
            const p = reversed.reversed ? (1 - progress) : progress;
            setVal(bounds[0] + (bounds[1] - bounds[0]) * easing(p));
            setPr(p);
        };
    };
    const moveBallEnded = (start: number, t: number) => {
        const done = t > start + animLength;
        if (done) {
            setReversed({ count: reversed.count + 1, reversed: !reversed.reversed });
        }
        return done;
    };


    const moveSound = (setVal: Function, easing: (t: number) => number) => {
        return (start: number, t: number) => {
            const progress = (t > start + animLength) ? 1 : (t - start) / animLength;
            const p = reversed.reversed ? (1 - progress) : progress;

            setVal(easing(p));
        };
    };
    const moveSoundEnded = (start: number, t: number) => {
        const done = t > start + animLength;
        if (done) {
            setReversed({ count: reversed.count + 1, reversed: !reversed.reversed });
        }
        return done;
    };

    useEffect(() => {
        setReversed({ ...reversed, count: 1 });
    }, []);

    useEffect(() => {
        const el = document.getElementById('sound');
        if (el) {
            const audio = el as HTMLAudioElement;
            audio.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (reversed.count > 0) {
            const delay = 400;
            setTimeout(() => {
                scheduleMultiple([
                    {
                        scheduledFor: t + delay,
                        step: moveBall(setX1, EasingUtil.linear),
                        isDone: moveBallEnded,
                        done: false,
                    },
                    {
                        scheduledFor: t + delay,
                        step: moveBall(setX2, EasingUtil.easeInQuad),
                        isDone: moveBallEnded,
                        done: false,
                    },
                    {
                        scheduledFor: t + delay,
                        step: moveBall(setX3, EasingUtil.easeOutQuad),
                        isDone: moveBallEnded,
                        done: false,
                    },
                    {
                        scheduledFor: t + delay,
                        step: moveSound(setVolume, EasingUtil.linear),
                        isDone: moveSoundEnded,
                        done: false,
                    },
                ]);
            }, delay);
        }
    }, [reversed]);

    useEffect(() => {
        const el = document.getElementById('sound');
        if (el) {
            const audio = el as HTMLAudioElement;
            if (!muted) {
                audio.play();

            } else {
                audio.pause();
            }
        }

    }, [muted])
    // bounds
    // [-45px, 20px]
    // [1000px, 20px]

    return (
        <>
            <audio id="sound" src={process.env.PUBLIC_URL + '/audio/Point and Click.wav'} loop />
            <div style={{ color: 'white', fontSize: '24px', textAlign: 'right' }}>{Date.now()} now</div>
            <div style={{ color: 'white', fontSize: '24px', textAlign: 'right' }}>{t} ms</div>
            <div style={{ color: 'white', fontSize: '24px', textAlign: 'right' }}>{seconds} sec</div>
            <div style={{ color: 'white', fontSize: '24px', textAlign: 'right' }}>{min} min</div>
            <div style={{ padding: '10px 10px' }}>
                <ToggleSoundButton muted={muted} fnClick={() => setMuted(!muted)} />
            </div>

            <div style={{ color: 'white', fontFamily: 'Abril Fatface', fontSize: 32, marginLeft: '20px' }}>Linear</div>
            <div>
                <div style={{
                    height: '80px',
                    margin: '20px',
                    backgroundColor: '#222',
                    overflow: 'hidden'
                }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: Colors.HotPink, borderRadius: '20px', transform: `translate(${x1}px, 20px)` }}></div>
                </div>
            </div>
            <div style={{ color: 'white', fontFamily: 'Abril Fatface', fontSize: 32, marginLeft: '20px' }}>Ease In</div>
            <div>
                <div style={{
                    height: '80px',
                    margin: '20px',
                    backgroundColor: '#222',
                    overflow: 'hidden'
                }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: Colors.HotPink, borderRadius: '20px', transform: `translate(${x2}px, 20px)` }}></div>
                </div>
            </div>
            <div style={{ color: 'white', fontFamily: 'Abril Fatface', fontSize: 32, marginLeft: '20px' }}>Ease Out</div>
            <div>
                <div style={{
                    height: '80px',
                    margin: '20px',
                    backgroundColor: '#222',
                    overflow: 'hidden'
                }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: Colors.HotPink, borderRadius: '20px', transform: `translate(${x3}px, 20px)` }}></div>
                </div>
            </div>
        </>
    );
}

function ToggleSoundButton({ muted, fnClick }: any) {
    return (
        <button style={{ border: 0, background: 0 }} onClick={fnClick}>
            {muted ? <MuteSoundIcon /> : <SoundIcon />}
        </button>
    );
}

export default Anim;