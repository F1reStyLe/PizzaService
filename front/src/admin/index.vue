<template>
  <v-tabs v-model="tab" align-tabs="center" bg-color="indigo">
    <v-tab value="users">Пользователи</v-tab>
    <v-tab value="pizza">Пиццы</v-tab>
    <v-tab value="ingridients">Ингридиенты</v-tab>
  </v-tabs>
  <v-divider />
  <v-row class="bg-indigo">
    <v-col cols="11">
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-plus" color="indigo" elevation="0" />
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="indigo"
              title="Добавить пользователя"
              density="compact"
            />
            <div class="pa-5">
              <v-row>
                <v-text-field
                  v-model="username"
                  label="Введите никнейм"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="password"
                  label="Введите пароль"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-spacer />
                <v-btn
                  class="mr-1"
                  text="Сохранить"
                  color="indigo"
                  variant="flat"
                  @click="addUser(isActive)"
                />
                <v-btn
                  text="Отмена"
                  color="error"
                  variant="flat"
                  @click="isActive.value = false"
                />
              </v-row>
            </div>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    <v-col v-if="selectUsers.length > 0">
      <v-btn icon="mdi-delete" color="indigo" elevation="0" @click="deleteUsers"/>
    </v-col>
  </v-row>
  <v-window v-model="tab">
    <v-window-item value="users">
      <v-data-table-virtual
        v-model="selectUsers"
        :headers="headers"
        :items="users"
        item-value="id"
        show-select
      ></v-data-table-virtual>
    </v-window-item>

    <v-window-item value="pizza"> </v-window-item>

    <v-window-item value="ingridients"> </v-window-item>
  </v-window>
</template>

<script lang="ts">
type User = {
  id: number;
  username: string;
  title: string;
};
export default {
  data() {
    return {
      users: [] as User[],
      password: "" as string,
      username: "" as string,
      role: 2,
      tab: null,
      headers: [
        { key: "id", title: "ID" },
        { key: "username", title: "Username" },
        { key: "title", title: "Role" },
      ],
      selectUsers: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = (await fetch("http://localhost:7000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())) as User[];
    },

    async addUser(state: any) {
      await fetch("http://localhost:7000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          role: this.role,
        }),
      });
      state.value = false;
      this.username = '';
      this.password = '';
      this.getUsers();
    },

    async deleteUsers() {
      await fetch(`http://localhost:7000/user`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dropUsers: this.selectUsers,
        }),
      });
      this.selectUsers = [];
      this.getUsers();
    },
  },
};
</script>
