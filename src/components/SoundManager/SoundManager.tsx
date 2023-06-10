import { useEffect, useState } from "react";

function getAudio(id: string): HTMLAudioElement | undefined {
    const el = document.getElementById(id);
    if (el) {
        return el as HTMLAudioElement;
    }
}

function playFromPool() {
    const channels = [
        'chan-sfx_0',
        'chan-sfx_1',
        'chan-sfx_2',
    ];

    for (let i = 0; i < channels.length; i++) {
        const audio = getAudio(channels[i]);
        if (audio?.duration === 0 || audio?.paused) {
            audio.volume = 0.5;
            audio.play();
            break;
        }

    }
}


function SoundManager({ soundRequest, musicRequest }: any) {
    const [request, setRequest] = useState();
    const [moozRequest, setMoozRequest] = useState();
    const [musicPath, setMusicPath] = useState({ count: 0, path: null });
    const [soundPath, setSoundPath] = useState({ count: 0, path: null });
    const [config, setConfig] = useState<any>({
        channels: {
            musicLoop: {
                path: process.env.PUBLIC_URL + '/audio/Point and Click.wav'
            },
            soundEffects: {
                crumble1: {
                    path: process.env.PUBLIC_URL + '/audio/effect/IMPACT_Stone_On_Stone_02_Subtle_mono.wav'
                },
                crumble0: {
                    path: process.env.PUBLIC_URL + '/audio/effect/IMPACT_Stone_On_Stone_01_Subtle_mono.wav'
                },
                diamond: {
                    path: process.env.PUBLIC_URL + '/audio/effect/8BIT_RETRO_Coin_Collect_Two_Dual_Note_Fast_Twinkle_mono.wav'
                },
                death: {
                    path: process.env.PUBLIC_URL + '/audio/effect/8BIT_RETRO_Explosion_Long_Distant_Fade_mono.wav'
                },
                bump: {
                    path: process.env.PUBLIC_URL + '/audio/effect/8BIT_RETRO_Hit_Bump_Thump_mono.wav'
                },
                walk: {
                    path: process.env.PUBLIC_URL + '/audio/effect/FOOTSTEP_Leather_Wood_Hollow_Walk_RR7_mono.wav'
                },
                siren: {
                    path: process.env.PUBLIC_URL + '/audio/effect/ALARM_Distorted_Echo_loop_stereo.wav'
                },
                resetPuzzle: {
                    path: process.env.PUBLIC_URL + '/audio/effect/UI_Click_Tap_Hybrid_Smooth_mono.wav'
                },
                backButton: {
                    path: process.env.PUBLIC_URL + '/audio/effect/COINS_Rattle_02_mono.wav'
                },
            }
        }
    });

    useEffect(() => {
        if (soundRequest !== request) {
            if (soundRequest.effect) {
                setSoundPath({ count: soundPath.count + 1, path: config.channels.soundEffects[soundRequest.effect].path });
            }
            setRequest(soundRequest);
        }
    }, [soundRequest, request, config.channels.soundEffects, soundPath]);

    useEffect(() => {
        if (musicRequest !== moozRequest) {
            if (musicRequest.effect) {
                setMusicPath({ count: musicPath.count + 1, path: config.channels.musicLoop.path });
            }
            setMoozRequest(musicRequest);
        }
    }, [musicRequest, moozRequest, config.channels.musicLoop, musicPath]);

    useEffect(() => {
        playFromPool();
    }, [soundPath]);

    return (
        <>
            {/* <audio id="sound" src={config.channels.musicLoop.path} autoPlay loop /> */}
            {musicPath.path && <>
                <audio id="chan-loop_0" src={musicPath.path} autoPlay loop />
            </>
            }
            {soundPath.path && <>
                <audio id="chan-sfx_0" src={soundPath.path} />
                <audio id="chan-sfx_1" src={soundPath.path} />
                <audio id="chan-sfx_2" src={soundPath.path} />
                <audio id="chan-sfx_3" src={soundPath.path} />
                <audio id="chan-sfx_4" src={soundPath.path} />
            </>
            }
        </>
    );
}


export function SoundEffect() {
    return (
        <audio src={process.env.PUBLIC_URL + '/audio/Point and Click.wav'} autoPlay loop />
    );
}

export default SoundManager;