var app = new Vue({
    el: "#app",
    data: {
        showAddPopup: false,
        showEditPopup: false,
        showDeletePopup: false
    },
    methods: {
        showAddOnClink() {
           this.showAddPopup = true
        },
        hideAddOnClink() {
            this.showAddPopup = false
        },
        showEditOnClink() {
            this.showEditPopup = true
        },
        hideEditOnClink() {
            this.showEditPopup = false
        },
        showDeleteOnClink() {
            this.showDeletePopup = true
        },
        hideDeleteOnClink() {
            this.showDeletePopup = false
        }

    }
})