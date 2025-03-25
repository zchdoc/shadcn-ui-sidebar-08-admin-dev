https://vercel.com/zchdocs-projects/shadcn-ui-sidebar-08-admin-dev/deployments
unix:
rm -f -r .next node_modules && npm i && npm run dev
rm -f -r .next node_modules
win:
powershell:
rm -r -fo .next, node_modules; npm i; npm run dev
cmd:
rmdir /s /q .next && rmdir /s /q node_modules && npm install && npm run dev

npm i && npm run dev
npm run dev
npm run build
npm run format && npm run pre-deploy
npm i && npm run format && npm run pre-deploy
npm run format
npm run pre-deploy

npm cache clean --force
