<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

const { data: events } = await useAsyncData("events", useEvents);

// Références pour les éléments observés
const eventElements = ref<HTMLElement[]>([]);
const observer = ref<IntersectionObserver | null>(null);

// Fonction pour initier l'observer
const initObserver = () => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.2 });

  nextTick(() => {
    eventElements.value.forEach((el) => observer.value?.observe(el));
  });
};

// Lancer l'observer au montage du composant
onMounted(() => {
  initObserver();
});
</script>

<template>
  <div class="timeline">
    <div class="timeline-line"></div>
    <div
      v-for="(event, index) in events"
      :key="event.id"
      class="event"
      ref="eventElements"
    >
      <div
        :class="['event-content', index % 2 === 0 ? 'left' : 'right']"
        :style="{ 'animation-delay': `${index * 0.1}s` }"
      >
        <div class="event-date">{{ event.date }}</div>
        <div class="event-title">{{ event.title }}</div>
        <div class="event-description">{{ event.description }}</div>
      </div>
      <div class="event-dot"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
  margin: 2rem;
  display: flex;
  flex-direction: column;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #2c3e50;
  z-index: 0;
  transform: translateX(-50%);
}

.event {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 18vh;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.event.animate {
  opacity: 1;
  transform: translateY(0);
}

.event-content {
  background-color: #f4f4f4;
  border-left: 6px solid $PrimaryColor;
  padding: 1rem;
  margin: 0 0 0 1rem;
  position: relative;
  transition: transform 0.3s ease;

  &.left {
    margin-left: 10%;
    margin-right: 50%;
    transform: translateX(-50px);
  }

  &.right {
    margin-left: 50%;
    margin-right: 10%;
    transform: translateX(50px);
  }

  &.animate {
    transform: translateX(0);
  }
}

.event-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.event-date {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.event-description {
  font-size: 1rem;
  color: #34495e;
}

.event-dot {
  width: 12px;
  height: 12px;
  background-color: #3498db;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

@media (max-width: 768px) {
  .timeline {
    margin: 1rem;
  }

  .event-content {
    padding-left: 1rem;

    &.left {
      margin-left: 5%;
      margin-right: 45%;
      transform: translateX(-30px);
    }

    &.right {
      margin-left: 45%;
      margin-right: 5%;
      transform: translateX(30px);
    }
  }

  .event-title {
    font-size: 1rem;
  }

  .event-date {
    font-size: 0.9rem;
  }

  .event-description {
    font-size: 0.9rem;
  }
}
</style>
