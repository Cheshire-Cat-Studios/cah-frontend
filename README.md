# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

##Running this code

There are a few ways to run this code, `npm run watch` which will build a node server or `npm run build` which compiles the code into the `./dist` folder including an `index.html` which you can run through nginx with the existing config in `./.docker/nginx`.

Both of these options exist in docker aswell. Run `docker-compose up node` for a node server and `docker-compose up nginx` for an nginx app running a distributed index.html.

If you are making changes to the dockerfiles use the options `--force-recreate` and `--build` to force any changes to be reflected 
e.g. `docker-compose up --force-recreate --build node`.