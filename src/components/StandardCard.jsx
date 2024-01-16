import { Show } from "solid-js";

export function StandardCard(props) {
    const weightLabel = () => {
        return `weight-${props.id}`;
    };
    const chances = () => {
        if (props.pickMeIsActive) {
            return `${props.pickMe ? 100 : 0}%`;
        }
        return `${parseFloat(props.weight / props.totalWeight * 100).toFixed(2)}%`;
    }

    return (
        <div class="m-2 flex items-center">
            <input type="text" name={`name-${props.id}`} placeholder="enter name here..."
                value={props.name} onInput={props.onNameInput}
                class="input input-bordered input-lg w-full max-w-xs" />

            <Show when={props.showDealerControl}>
                <label for={weightLabel()} class="mx-2">Weight:</label>
                <input type="number" name={weightLabel()} min="0" max="10000"
                    value={props.weight} onInput={props.onWeightInput}
                    class="input" />
                <input type="checkbox" class="checkbox checkbox-secondary mx-2"
                    onChange={props.setPickMeOption} checked={props.pickMe} />
                <span>Chance: {chances()}</span>
            </Show>
        </div>
    );
}
