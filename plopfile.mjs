import fse from 'fs-extra';
import { join } from 'path';
export default function (plop) {
  const mainDir = getDirectorys(join('src/main'));
  plop.setGenerator('entities', {
    description: '快速生成实体',
    prompts: [
      { type: 'input', name: 'name', message: '请输入实体名称' },
      {
        type: 'list',
        name: 'module',
        message: '请选择主模块',
        choices: mainDir,
      },
    ],
    actions(data) {
      const { name, module } = data;
      const target = `src/main/${module}/entities`;
      const actions = [
        {
          type: 'add',
          path: `${target}/${name}.entity.ts`,
          templateFile: 'template/entity.hbs',
        },
      ];
      return actions;
    },
  });
}

function getDirectorys(target) {
  // 获取target下的所有文件夹
  return fse.readdirSync(target).filter((name) => {
    return fse.statSync(`${target}/${name}`).isDirectory();
  });
}
