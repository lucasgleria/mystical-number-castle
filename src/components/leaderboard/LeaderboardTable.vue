<template>
  <div class="leaderboard-table-wrapper">
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Nome</th>
          <th>Dificuldade</th>
          <th>Score</th>
          <th>Tentativas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, idx) in leaderboardData" :key="entry.name + entry.score + entry.difficulty">
          <td>{{ idx + 1 }}</td>
          <td>{{ entry.name }}</td>
          <td class="diff-cell">
            <span :class="'diff-' + entry.difficulty">{{ entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1) }}</span>
          </td>
          <td>{{ entry.score }}</td>
          <td>{{ entry.attempts }}</td>
        </tr>
        <tr v-if="leaderboardData.length === 0">
          <td colspan="5" class="empty-row">Nenhum registro ainda.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Props: leaderboardData (array), selectedDifficulty (string)
defineProps({
  leaderboardData: {
    type: Array,
    required: true
  },
  selectedDifficulty: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.leaderboard-table-wrapper {
  width: 100%;
  overflow-x: auto;
}
.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255,255,255,0.07);
  border-radius: 12px;
  overflow: hidden;
  font-size: 1rem;
}
.leaderboard-table th, .leaderboard-table td {
  padding: 0.5em 0.7em;
  text-align: center;
}
.leaderboard-table th {
  background: rgba(34,34,60,0.9);
  color: #FFD700;
  font-weight: bold;
}
.leaderboard-table tbody tr:nth-child(even) {
  background: rgba(255,255,255,0.04);
}
.leaderboard-table tbody tr:nth-child(odd) {
  background: rgba(255,255,255,0.09);
}
.diff-cell .diff-easy {
  color: #7be67b;
  font-weight: bold;
}
.diff-cell .diff-medium {
  color: #ffe066;
  font-weight: bold;
}
.diff-cell .diff-hard {
  color: #ff4d4d;
  font-weight: bold;
}
.empty-row {
  color: #bbb;
  font-style: italic;
  text-align: center;
}
</style> 