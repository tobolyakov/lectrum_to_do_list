import { MAIN_URL, TOKEN } from './config';

export const api = {

    async fetchTasks () {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'GET',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error('Tasks were not loaded');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },

    async createTask (message) {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'POST',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.status !== 200) {
            throw new Error('Task were not created');
        }

        const { data: task } = await response.json();

        return task;
    },

    async updateTask (taskProps) {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'PUT',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([taskProps]),
        });

        if (response.status !== 200) {
            throw new Error('Task were not updated');
        }
    },

    async removeTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error('Task were not removed');
        }
    },

    async completeAllTasks (tasksList) {
        const tasksFetch =  tasksList.map((taskProps) => {
            return fetch(`${MAIN_URL}`, {
                method:  'PUT',
                headers: {
                    Authorization:  TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([taskProps]),
            });
        });

        await Promise.all(tasksFetch).then(
            (resolve) => {
                resolve.forEach((response) => {
                    if (response.status !== 200) {
                        throw new Error('Task were not updated');
                    }
                });
            },
            (error) => `Tasks were not updated ${error.message}`
        );
    },

};