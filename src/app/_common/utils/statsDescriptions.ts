import { countDescriptiosByStats, StatDescriptionPokemon, StatDescriptions, StatName, StatType } from "../../_types/Stats";

export const statDescriptions: StatDescriptions = {
  ranges: [40, 80],
  stats: {
    attack: {
      positive: {
        "1":{
          texto: "Sus ataques son decentes, pueden sorprender si no te cuidas.",
          icono: "FitnessCenter",
        },
        "2":{
          texto: "Cuando ataca, el suelo tiembla bajo sus pies.",
          icono: "Gavel",
        },
        "3":{
          texto: "Su fuerza es brutal, cada golpe es una sentencia.",
          icono: "Warning",
        },
      },
      negative: {
        "1":{
          texto: "Su fuerza apenas se nota, pero algo hace.",
          icono: "Hotel",
        },
        "2":{
          texto: "Golpea como si estuviera lanzando plumas.",
          icono: "EmojiEmotions",
        },
        "3":{
          texto: "Su ataque es tan débil que apenas puede hacer daño.",
          icono: "Block",
        },
      },
    },
    defense: {
      positive: {
        "1":{
          texto: "Puede aguantar algunos golpes sin problema.",
          icono: "CheckCircle",
        },
        "2":{
          texto: "Su cuerpo es como un muro, resiste con firmeza.",
          icono: "Security",
        },
        "3":{
          texto: "Es casi impenetrable, un verdadero tanque de batalla.",
          icono: "Shield",
        },
      },
      negative: {
        "1":{
          texto: "Su defensa no es la mejor, pero algo aguanta.",
          icono: "FilterDrama",
        },
        "2":{
          texto: "Cae ante ataques comunes como si fuera nada.",
          icono: "Air",
        },
        "3":{
          texto: "Su defensa es un chiste, lo derriban con un soplido.",
          icono: "WarningAmber",
        },
      },
    },
    special_attack: {
      positive: {
        "1":{
          texto: "Sus ataques especiales son aceptables, pueden hacer daño.",
          icono: "EmojiObjects",
        },
        "2":{
          texto: "Desata energía especial con una potencia notable.",
          icono: "Bolt",
        },
        "3":{
          texto:
            "Su poder especial es devastador, un espectáculo de destrucción.",
          icono: "AutoAwesome",
        },
      },
      negative: {
        "1":{
          texto: "Su energía especial es algo baja, pero hace el intento.",
          icono: "Lightbulb",
        },
        "2":{
          texto: "Lanza ataques especiales que apenas hacen cosquillas.",
          icono: "Toys",
        },
        "3":{
          texto: "Su ataque especial es tan débil que pasa desapercibido.",
          icono: "HighlightOff",
        },
      },
    },
    special_defense: {
      positive: {
        "1":{
          texto: "Aguanta bien los ataques especiales más suaves.",
          icono: "Check",
        },
        "2":{
          texto: "Su resistencia especial es sólida como una barrera mágica.",
          icono: "AutoFixHigh",
        },
        "3":{
          texto: "Es casi inmune a cualquier ataque especial.",
          icono: "Verified",
        },
      },
      negative: {
        "1":{
          texto: "Le cuesta resistir ataques especiales, pero a veces aguanta.",
          icono: "ReportGmailerrorred",
        },
        "2":{
          texto: "Cualquier ataque especial le hace bastante daño.",
          icono: "Air",
        },
        "3":{
          texto: "Su defensa especial es tan frágil como el cristal.",
          icono: "Warning",
        },
      },
    },
    speed: {
      positive: {
        "1":{
          texto: "Es más rápido que el promedio, pero no el más veloz.",
          icono: "TrendingUp",
        },
        "2":{
          texto: "Se mueve con agilidad, difícil de atrapar.",
          icono: "DirectionsRun",
        },
        "3":{
          texto: "Es un rayo, nadie puede alcanzarlo.",
          icono: "FlashOn",
        },
      },
      negative: {
        "1":{
          texto: "No es muy rápido, pero puede reaccionar a tiempo a veces.",
          icono: "AccessTime",
        },
        "2":{
          texto: "Se mueve como si estuviera en cámara lenta.",
          icono: "HourglassBottom",
        },
        "3":{
          texto: "Es más lento que una tortuga dormida.",
          icono: "PauseCircleFilled",
        },
      },
    },
  },
};

interface propsgetDescriptionStats {
  type:StatType
  value:number
  names:StatName[]
};

export const getDescriptionStats = ({type, value, names}:propsgetDescriptionStats):StatDescriptionPokemon[] =>{

  if(!names.length )return []

  const allDescripsions = names.map((name) => statDescriptions.stats[name]);
  const ranges = statDescriptions.ranges;
  let tier = ranges.reduce((_, item: number, index) => (value > item ? index : index + 1), 0);
  console.log({tier, value});
  
  if (type === "negative") {
    tier = 4 - tier;
  }
  
  return allDescripsions.map((stat) => ({
  ...stat[type][tier as countDescriptiosByStats],
  tier,
  type
}));

}