// Contenido del sitio principal de FRATE.
// Editar aquí los textos/datos reales sin tocar los componentes.

export const stats = [
  { num: '3', lbl: 'Proyectos activos' },
  { num: '+1,125', lbl: 'Beneficiarios directos e indirectos' },
  { num: '11', lbl: 'Instituciones de educación superior alcanzadas' },
]

export const proyectos = [
  {
    id: 'puente',
    tag: 'puente',
    escudo: 'PC',
    year: '2026',
    title: 'Puente Calicanto',
    desc: 'Producción de pistas musicales litúrgicas para cuarteto de cuerdas y orquesta sinfónica, dedicadas a los niños de la Aldea Infantil San Juan Bosco.',
    achievements: ['15 pistas musicales', '30 niños beneficiarios', '15 estudiantes voluntarios'],
    link: 'https://calicanto.frate.lat',
    soon: false,
  },
  {
    id: 'cajon',
    tag: 'cajon',
    escudo: 'CP',
    year: '2026',
    title: 'Cajón Peruano',
    desc: 'Producción musical colaborativa de un álbum junto con líderes de las Juntas Vecinales de Huánuco.',
    achievements: ['15 líderes vecinales', '24 pistas', '19 Juntas Vecinales'],
    link: 'https://cajonperuano.frate.lat',
    soon: false,
  },
  {
    id: 'catequistas',
    tag: 'catequistas',
    escudo: 'FC',
    year: null,
    title: 'Formación de Catequistas',
    desc: 'Programa de formación para catequistas de la Diócesis de Huánuco. Contenido en preparación.',
    achievements: [],
    link: 'https://formacioncatequistas.frate.lat',
    soon: true,
  },
]

export const equipo = [
  {
    initials: 'LM',
    name: 'Lizette Mejia Paulino',
    role: 'Gerenta General',
    bio: 'Lidera la visión estratégica; encargada de que cada proyecto tenga sentido, dirección y un impacto real en las comunidades de Huánuco.',
  },
  {
    initials: 'AB',
    name: 'Aland Bravo Vecorena',
    role: 'Gestor de industria cultural, artística y musical',
    bio: 'El motor creativo detrás de los proyectos, conecta artistas, instituciones y comunidades para transformar ideas en experiencias culturales que dejan huella.',
  },
  {
    initials: 'BA',
    name: 'Benyamin Adrian Lazaro',
    role: 'Tecnología',
    bio: 'Encargado de Diseñar y mantiener las plataformas que hacen posible que cada proyecto tenga presencia en línea y llegue a más personas.',
  },
]

export const aliados = [
  {
    name: 'Diócesis de Huánuco',
    desc: 'Acompañamiento espiritual y validación doctrinal de los contenidos de los proyectos formativos.',
  },
  {
    name: 'Asociación de Artistas Freestyle',
    desc: 'Artistas freestyle de Huánuco que participan activamente en los proyectos de coaching corporativo.',
  },
  {
    name: 'Pastoral Universitaria',
    desc: 'Articulación con instituciones de educación superior para la implementación de proyectos en campus.',
  },
]

export const contacto = {
  email: 'info@frate.lat',
  ubicacion: 'Huánuco, Perú',
  redes: [
    { label: 'IG', title: 'Instagram', href: '#' },
    { label: 'FB', title: 'Facebook', href: '#' },
    { label: 'WA', title: 'WhatsApp', href: '#' },
  ],
}
