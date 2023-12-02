<template>
  <v-row>
    <v-col>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="indigo" icon="mdi-plus" />        
        </template>
        <template v-slot:default="{ isActive }">
          <v-card >
            <v-toolbar color="indigo" title="Добавить пользователя" density="compact" />
            <div class="pa-5">
              <v-row>
                <v-text-field v-model="username" label="Введите никнейм"></v-text-field>
              </v-row>
              <v-row>
                <v-text-field v-model="password" label="Введите пароль"></v-text-field>
              </v-row>
              <v-row>
                <v-spacer />
                <v-btn class="mr-1" text="Сохранить" color="indigo" variant="flat" @click="addUser(isActive)"/>
                <v-btn text="Отмена" color="error" variant="flat" @click="isActive.value = false"/>
              </v-row>
            </div>
        </v-card>
        </template>
      </v-dialog>
     
    </v-col>
  </v-row>
  <v-container>
   <v-list lines="one">
    <v-list-item v-for="el in users" :key="el.username">
      <v-card color="indigo">
        <v-card-item>
          <v-card-title>
           {{el.username}}
          </v-card-title>
          <v-card-subtitle>
            {{ el.title }}
          </v-card-subtitle>
        </v-card-item>
        <v-card-actions>
          <v-spacer/>
            <v-btn text="Удалить" variant="flat" color="error"/>
          </v-card-actions>
      </v-card>
    </v-list-item>
   </v-list>
  </v-container>
</template>

<script lang="ts">
type User = {
  username: string,
  title: string,
};
export default {
 
  data() {
    return {
      users: [] as User[],
      password: '' as string,
      username: '' as string,
      role: 2,
    }
  },
  created(){
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = await fetch('http://localhost:7000/user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      }).then(res => res.json()) as User[];
    },

    async addUser(state: any) {
      await fetch('http://localhost:7000/user', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          role: this.role,
        })
      });
      state.value = false;
      this.getUsers();
    },

    async deleteUser(id: number) {
      await fetch(`http://localhost:7000/user/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      });
      this.getUsers();
    },
  }
}
</script>