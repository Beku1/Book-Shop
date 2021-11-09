import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <button @click="cancelMsg">X</button>
            <p>{{msg.txt}}</p>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 4000);
        },
        cancelMsg(){
            this.msg = null
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    }
}
