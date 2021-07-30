import {Options, Vue} from 'vue-class-component';
import Notifications from './notifications/notifications.vue';
import User from './user/user.vue';

@Options({
    components: {
        'notifications-dropdown': Notifications,
        'user-dropdown': User
    }
})
export default class Header extends Vue {
    public onToggleMenuSidebar(): void {
        this.$emit('toggle-menu-sidebar');
    }
}
