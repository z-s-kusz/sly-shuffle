import { For, Show, createSignal } from "solid-js";
import { getRandomItemWithCheatOption } from "../utility/getRandomItemWithCheatOption";

export function Wheel(props) {
    const [result, setResult] = createSignal(null);

    const spin = () => {
        const selection = getRandomItemWithCheatOption(props.inputs);
        setResult(selection);
    };

    return (
        <>
            <ul>
                <For each={props.inputs}>
                    {(input) => {
                        return <li>{input.name}</li>
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
