<template>
    <li class="nav-item dropdown" ref="dropdown">
        <button class="nav-link" data-toggle="dropdown" @click="toggleDropdown">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">3</span>
        </button>
        <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
            :class="{'show':isDropdownOpened}"
        >
            <span class="dropdown-item dropdown-header">3 Notifications</span>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
                <i class="fas fa-envelope mr-2"></i> 1 new messages
                <span class="float-right text-muted text-sm">1 mins</span>
            </a>
            <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
                <i class="fas fa-envelope mr-2"></i> 2 new messages
                <span class="float-right text-muted text-sm">2 mins</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
                <i class="fas fa-envelope mr-2"></i> 3 new messages
                <span class="float-right text-muted text-sm">3 mins</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer"
                >See All Notifications</a
            >
        </div>
    </li>
</template>

<script>
    export default {
        name: "dashboard",
        data() {
            return {
            };
        }
    };

    // private isDropdownOpened = false;

    // public mounted(): void {
    //     document.addEventListener('click', this.documentClick);
    // }

    // public unmounted(): void {
    //     document.removeEventListener('click', this.documentClick);
    // }

    // private toggleDropdown() {
    //     this.isDropdownOpened = !this.isDropdownOpened;
    // }

    // private documentClick(event: Event) {
    //     const el: HTMLElement = this.$refs.dropdown as HTMLElement;
    //     const target: HTMLElement = event.target as HTMLElement;
    //     if (el !== target && !el.contains(target)) {
    //         this.isDropdownOpened = false;
    //     }
    // }
</script>
