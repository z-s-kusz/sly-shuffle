import { Show } from "solid-js";

export function StandardCard(props) {
    // chanceLabel is not reactive but doesn't need to be
    // would need to access props.id in the jsx if we needed true reactivity (which we don't here)
    const chanceLabel = () => {
        return `chance-${props.id}`;
    };

    return (
        <div class="m-2 flex items-center">
            <input type="text" name={`name-${props.id}`} placeholder="enter name here..."
                value={props.name} onInput={props.onNameInput}
                class="input input-bordered input-lg w-full max-w-xs" />

            <Show when={props.showDealerControl}>
                <label for={chanceLabel()} class="mx-2">Chance:</label>
                <input type="text" name={chanceLabel()}
                    value={props.chance} onInput={props.onchanceInput}
                    class="input w-full max-w-xs" />
            </Show>
        </div>
    );
}
