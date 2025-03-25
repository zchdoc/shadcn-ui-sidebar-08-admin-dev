https://vercel.com/zchdocs-projects/shadcn-ui-sidebar-08-admin-dev/deployments
unix:
rm -f -r .next node_modules && pnpm i && pnpm run dev
rm -f -r .next node_modules
win:
powershell:
rm -r -fo .next, node_modules; pnpm i; pnpm run dev
rm -r -fo .next, node_modules;
cmd:
rmdir /s /q .next && rmdir /s /q node_modules && pnpm install && pnpm run dev

pnpm i && pnpm run dev
pnpm run dev
pnpm run build
pnpm run format && pnpm run pre-deploy
pnpm i && pnpm run format && pnpm run pre-deploy
pnpm run format
pnpm run pre-deploy

pnpm cache clean --force
