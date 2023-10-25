export const getClassesFromObj = (arrClassNames, objStyles) =>
         arrClassNames.split(' ').map(_class => objStyles[_class]).join(' ');