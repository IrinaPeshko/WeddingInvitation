import { card } from './card.js';
import { util } from './util.js';
import { theme } from './theme.js';
import { storage } from './storage.js';
import { pagination } from './pagination.js';

export const comment = (() => {

    const owns = storage('owns');
    const session = storage('session');

    const remove = async (button) => {
        if (!confirm('Are you sure?')) {
            return;
        }

        const id = button.getAttribute('data-uuid');

        if (session.get('token')?.split('.').length === 3) {
            owns.set(id, button.getAttribute('data-own'));
        }

        const btn = util.disableButton(button);

        btn.restore();
    };

    const changeButton = (id, disabled) => {
        const buttonMethod = ['reply', 'edit', 'remove'];

        buttonMethod.forEach((v) => {
            const status = document.querySelector(`[onclick="comment.${v}(this)"][data-uuid="${id}"]`);
            if (status) {
                status.disabled = disabled;
            }
        });
    };

    const update = async (button) => {
        const id = button.getAttribute('data-uuid');

        const presence = document.getElementById(`form-inner-presence-${id}`);
        if (presence) {
            presence.disabled = true;
        }

        const form = document.getElementById(`form-${id ? `inner-${id}` : 'comment'}`);
        form.disabled = true;

        const cancel = document.querySelector(`[onclick="comment.cancel('${id}')"]`);
        if (cancel) {
            cancel.disabled = true;
        }

        const btn = util.disableButton(button);

        form.disabled = false;
        if (cancel) {
            cancel.disabled = false;
        }

        if (presence) {
            presence.disabled = false;
        }

        btn.restore();
    };

    const send = async (button) => {
        const id = button.getAttribute('data-uuid');

        const name = document.getElementById('form-name');
        if (name.value.length == 0) {
            alert('Please fill name');
            return;
        }

        const presence = document.getElementById('form-presence');
        if (!id && presence && presence.value == "0") {
            alert('Please select presence');
            return;
        }

        if (presence) {
            presence.disabled = true;
        }

        const form = document.getElementById(`form-${id ? `inner-${id}` : 'comment'}`);
        form.disabled = true;

        const cancel = document.querySelector(`[onclick="comment.cancel('${id}')"]`);
        if (cancel) {
            cancel.disabled = true;
        }

        const btn = util.disableButton(button);

        form.disabled = false;
        if (cancel) {
            cancel.disabled = false;
        }

        if (presence) {
            presence.disabled = false;
        }

        btn.restore();
    };

    const cancel = (id) => {
        if (document.getElementById(`form-inner-${id}`).value.length === 0 || confirm('Are you sure?')) {
            changeButton(id, false);
            document.getElementById(`inner-${id}`).remove();
        }
    };

    const reply = (button) => {
        const id = button.getAttribute('data-uuid');

        if (document.getElementById(`inner-${id}`)) {
            return;
        }

        changeButton(id, true);

        const inner = document.createElement('div');
        inner.classList.add('my-2');
        inner.id = `inner-${id}`;
        inner.innerHTML = `
        <label for="form-inner-${id}" class="form-label">Reply</label>
        <textarea class="form-control shadow-sm rounded-3 mb-2" id="form-inner-${id}" placeholder="Type reply comment"></textarea>
        <div class="d-flex flex-wrap justify-content-end align-items-center mb-0">
            <button style="font-size: 0.8rem;" onclick="comment.cancel('${id}')" class="btn btn-sm btn-outline-${theme.isDarkMode('light', 'dark')} rounded-3 py-0 me-1">Cancel</button>
            <button style="font-size: 0.8rem;" onclick="comment.send(this)" data-uuid="${id}" class="btn btn-sm btn-outline-${theme.isDarkMode('light', 'dark')} rounded-3 py-0">Send</button>
        </div>`;

        document.getElementById(`button-${id}`).insertAdjacentElement('afterend', inner);
    };

    const edit = async (button) => {
        const id = button.getAttribute('data-uuid');

        if (document.getElementById(`inner-${id}`)) {
            return;
        }

        changeButton(id, true);
        const tmp = button.innerText;
        button.innerText = 'Loading..';

        button.innerText = tmp;
    };

    const comment = async () => {
        card.renderLoading();
    };

    return {
        cancel,
        send,
        edit,
        reply,
        remove,
        update,
        comment,
        renderLoading: card.renderLoading,
    }
})();