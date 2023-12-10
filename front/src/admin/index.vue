<template>
  <v-tabs v-model="tab" align-tabs="center" bg-color="indigo">
    <v-tab v-for="el of titles" :value="el.value">
      {{ el.title }}
    </v-tab>
  </v-tabs>
  <v-divider />
  <v-row class="bg-indigo">
    <v-col cols="11">
      <dialog-window title="Добавить пользователя" @submit="onAddUser">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-plus" color="indigo" elevation="0" />
        </template>
        <v-row>
          <v-text-field label="Введите никнейм" />
        </v-row>
        <v-row>
          <v-text-field label="Введите пароль" />
        </v-row>
        <v-row>
          <v-combobox
            v-model="role"
            item-value="id"
            label="Введите роль"
            :items="roles"
            :return-object="false"
          />
        </v-row>
      </dialog-window>
    </v-col>
    <v-col v-if="selectUsers.length > 0">
      <v-btn
        icon="mdi-delete"
        color="indigo"
        elevation="0"
        @click="deleteUsers"
      />
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
import gql from "graphql-tag";
import dialogWindow from "../components/DialogWindow.vue";

type User = {
  id: number;
  username: string;
  role: {
    title: string;
  };
};

type Role = {
  id: number;
  title: string;
};

type Titles = {
  value: string;
  title: string;
};
export default {
  components: { dialogWindow },
  props: {
    titles: Array<Titles>,
  },
  data() {
    return {
      users: [] as User[],
      selectUsers: [] as number[],
      roles: [] as Role[],
      password: "" as string,
      username: "" as string,
      tab: null,
      role: 2,
      headers: [
        { key: "id", title: "ID" },
        { key: "username", title: "Username" },
        { key: "role[0].title", title: "Role" },
      ],
    };
  },
  apollo: {
    users: gql`
      query {
        users {
          id
          username
          role {
            title
          }
        }
      }
    `,
    roles: gql`
      query {
        roles {
          id
          title
        }
      }
    `,
  },
  methods: {
    onAddUser(isActive: any) {
      this.username = "";
      this.password = "";
      isActive.value = false;
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
    },
  },
};
</script>
