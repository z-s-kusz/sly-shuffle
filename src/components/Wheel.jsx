import { For, Show, createMemo, createSignal } from "solid-js";
import { getRandomItemWithCheatOption } from "../utility/getRandomItemWithCheatOption";
import './Wheel.css';

export function Wheel(props) {
    const [result, setResult] = createSignal({});

    const wheelList = createMemo(() => {
        const list = [];
        for (let i = 0; i < 3; i++) {
            props.inputs.forEach((input) => {
                let className = 'item border-4 rounded-md m-2 p-4';
                // highlight 2nd from end so there are items to the left when selected is shown
                if (i === 1 && result().id === input.id) className += ' selected';

                list.push({
                    ...input,
                    id: `${input.id}-${i}`,
                    className,
                });
            });
        }
        return list;
    });

    const spin = () => {
        const selection = getRandomItemWithCheatOption(props.inputs);
        setResult(selection);
    };

    return (
        <>
            <ul class="flex flex-row border-2 rounded-md">
                <For each={wheelList()}>
                    {(input) => {
                        return <li class={input.className}>{input.name}</li>
                    }}
                </For>
            </ul>
{/* TODO disable when there are 0 options (allow 1 even though its dumb) */}
            <button class="btn btn-primary" onClick={spin}>Spin</button>

            <Show when={result()}>
                <h1 class="text-3xl">Result: {result().name}</h1>
            </Show>
        </>
    );
}
