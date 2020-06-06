var app = new Vue({
    el: "#app",

    data: {
        showAddPopup: false,
        showEditPopup: false,
        showDeletePopup: false,
        loading: true,
        contacts: [],
        newContact: {name: "", phone: ""},
        selectedContact: {}
    },

    mounted() {
        this.getAllContacts();
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
        },

        getAllContacts() {
            axios.get("http://localhost/vue-php-crud/api.php?action=read")
                .then(response => {
                    this.contacts = response.data.contacts;
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        addNewContact() {
            if (!this.newContact.name || !this.newContact.phone) {
                return;
            }

            var formData = this.toFormData(this.newContact);

            axios.post("http://localhost/vue-php-crud/api.php?action=create", formData)
                .then(response => {
                    this.newContact = {name: "", phone: ""}
                    this.getAllContacts()
                })
                .catch(error => {
                    console.log(error)
                })
        },

        selectContact(contact) {
            this.selectedContact = contact
        },

        editContact() {
            var formData = this.toFormData(this.selectedContact);

            axios.post("http://localhost/vue-php-crud/api.php?action=update", formData)
                .then(response => {
                    this.selectedContact = {}
                    this.getAllContacts()
                })
                .catch(error => {
                    console.log(error)
                })
        },

        deleteContact() {
            var formData = this.toFormData(this.selectedContact);

            axios.post("http://localhost/vue-php-crud/api.php?action=delete", formData)
                .then(response => {
                    this.selectedContact = {}
                    this.getAllContacts()
                })
                .catch(error => {
                    console.log(error)
                })
        },

        toFormData(obj) {
            var from_data = new FormData();

            for (var key in obj) {
                from_data.append(key, obj[key])
            }

            return from_data;
        }
    }
})