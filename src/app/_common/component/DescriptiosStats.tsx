import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { StatName, statNames, StatType } from "../../_types/Stats";
import { Pokemon } from "../../_types/Pokemon";
import { getDescriptionStats } from "../utils/statsDescriptions";
import { Box, Tooltip, Typography } from "@mui/material";

// Importación dinámica de iconos de MUI
const iconMap: Record<string, React.ElementType> = {
  FitnessCenter: require('@mui/icons-material/FitnessCenter').default,
  Gavel: require('@mui/icons-material/Gavel').default,
  Warning: require('@mui/icons-material/Warning').default,
  Hotel: require('@mui/icons-material/Hotel').default,
  EmojiEmotions: require('@mui/icons-material/EmojiEmotions').default,
  Block: require('@mui/icons-material/Block').default,
  CheckCircle: require('@mui/icons-material/CheckCircle').default,
  Security: require('@mui/icons-material/Security').default,
  Shield: require('@mui/icons-material/Shield').default,
  FilterDrama: require('@mui/icons-material/FilterDrama').default,
  Air: require('@mui/icons-material/Air').default,
  WarningAmber: require('@mui/icons-material/WarningAmber').default,
  EmojiObjects: require('@mui/icons-material/EmojiObjects').default,
  Bolt: require('@mui/icons-material/Bolt').default,
  AutoAwesome: require('@mui/icons-material/AutoAwesome').default,
  Lightbulb: require('@mui/icons-material/Lightbulb').default,
  Toys: require('@mui/icons-material/Toys').default,
  HighlightOff: require('@mui/icons-material/HighlightOff').default,
  Check: require('@mui/icons-material/Check').default,
  AutoFixHigh: require('@mui/icons-material/AutoFixHigh').default,
  Verified: require('@mui/icons-material/Verified').default,
  ReportGmailerrorred: require('@mui/icons-material/ReportGmailerrorred').default,
  TrendingUp: require('@mui/icons-material/TrendingUp').default,
  DirectionsRun: require('@mui/icons-material/DirectionsRun').default,
  FlashOn: require('@mui/icons-material/FlashOn').default,
  AccessTime: require('@mui/icons-material/AccessTime').default,
  HourglassBottom: require('@mui/icons-material/HourglassBottom').default,
  PauseCircleFilled: require('@mui/icons-material/PauseCircleFilled').default,
};

// Mapeo de tamaño de icono según tier
const tierIconSize: Record<number, "small" | "medium" | "large"> = {
  1: "small",
  2: "medium",
  3: "large",
};

export default function DescriptiosStats(pokemons: Pokemon) {
  const statValues = statNames.map((stat) => ({
    name: stat,
    value: pokemons[stat],
  }));

  // Encontrar los nombres de las propiedades que tienen el valor máximo y mínimo
  let maxStats = statValues.filter((s) => s.value === pokemons.stat_max).map((s) => s.name);
  let minStats: StatName[] = statValues.filter((s) => s.value === pokemons.stat_min).map((s) => s.name);
  if (maxStats.length === 5) {
    if (pokemons.stat_max < 50) {
      maxStats = []
    } else {
      minStats = []
    }
  } else {
    if (pokemons.stat_min > 51) {
      minStats = []
    }
    if (pokemons.stat_max < 51) {
      maxStats = []
    }
  }

  const descriptionStatsMax = getDescriptionStats({
    type: "positive",
    value: pokemons.stat_max,
    names: maxStats,
  });

  const descriptionStatsMin = getDescriptionStats({
    type: "negative",
    value: pokemons.stat_min,
    names: minStats,
  });

  // Unir ambas descripciones
  const allDescriptions = [...descriptionStatsMax, ...descriptionStatsMin];

  return (
    <Box display="flex" flexWrap="wrap" gap={1} marginTop={1} width={"100%"} justifyContent={"center"} >
      {allDescriptions.map((desc, idx) => {
        const Icon = iconMap[desc.icono] || CheckIcon;
        // Determinar si es positiva o negativa
        const isPositive = idx < descriptionStatsMax.length;
        // Color del icono
        const iconColor = isPositive ? "#299250" : "#F7613C";
        // Tamaño del icono según tier
        const iconSize = tierIconSize[desc.tier] || "medium";
        return (
          <Tooltip key={idx} title={<Typography fontSize="0.8rem">{desc.texto}</Typography>} arrow>
            <Box
              display="flex"
              alignItems="center"
              width={"100%"}
              marginInline={1.5 * desc.tier}
              sx={{
                px: 1,
                py: 0.2,
                color: "text.primary",
                borderRadius: 2,
                fontSize: "0.65rem",
                backgroundColor: isPositive
                  ? `rgba(76, 175, 79, 0.70)`
                  : `rgba(247, 97, 60, 0.7)`,
                minHeight: 24,
                minWidth: 0,
                maxWidth: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer"
              }}
            >
              <Icon fontSize={iconSize} style={{ marginRight: 4 }} size={iconSize} />
              <span style={{ fontWeight: 500, fontSize: "0.7rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{desc.texto}</span>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
