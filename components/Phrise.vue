<template>
    <div class="timeline">
      <div class="timeline-line"></div>
      <div
        class="event"
        v-for="(event, index) in events"
        :key="event.title"
        :class="{'animate': isVisible(index)}"
        ref="eventElement"
      >
        <div
          :class="['event-content', index % 2 === 0 ? 'left' : 'right']"
          :style="{'animation-delay': `${index * 0.1}s`}"
        >
          <div class="event-date">{{ event.date }}</div>
          <div class="event-title">{{ event.title }}</div>
          <div class="event-description">{{ event.description }}</div>
        </div>
        <div class="event-dot"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [
          {
            title: "WannaCry (2017)",
            date: "Mai 2017",
            description:
              "Une cyberattaque massive utilisant un ransomware qui a exploité une vulnérabilité Windows (EternalBlue). Plus de 200 000 ordinateurs infectés dans 150 pays, affectant hôpitaux, entreprises et administrations."
          },
          {
            title: "L'attaque de SolarWinds (2020-2021)",
            date: "Décembre 2020 - 2021",
            description:
              "Une opération de cyberespionnage d’envergure contre des agences gouvernementales et entreprises à travers le monde via une chaîne d'approvisionnement compromise."
          },
          {
            title: "Les révélations d’Edward Snowden (2013)",
            date: "Juin 2013",
            description:
              "Snowden dévoile l'ampleur de la surveillance mondiale menée par la NSA, mettant en lumière l'espionnage de masse et les cyber-opérations menées par les gouvernements."
          },
          {
            title: "La faille Log4Shell (2021)",
            date: "Décembre 2021",
            description:
              "Une vulnérabilité critique dans Log4j, une bibliothèque Java très utilisée, qui permettait aux hackers d’exécuter du code à distance sur des millions de serveurs à travers le monde."
          },
          {
            title: "L’attaque de Colonial Pipeline (2021)",
            date: "Mai 2021",
            description:
              "Un ransomware a paralysé l’un des plus grands oléoducs américains, provoquant des pénuries d'essence. Les hackers ont exigé une rançon en cryptomonnaie."
          },
          {
            title: "L’attaque massive contre Yahoo (2013-2014)",
            date: "2013-2014",
            description:
              "Yahoo a subi l’une des plus grandes fuites de données de l’histoire, avec 3 milliards de comptes compromis, révélant des failles majeures dans la protection des données personnelles."
          },
          {
            title: "Stuxnet (Découverte en 2010)",
            date: "2010",
            description:
              "Un ver informatique conçu pour saboter le programme nucléaire iranien. C’est l’un des premiers cas connus de cyberguerre, où un logiciel malveillant a physiquement endommagé des infrastructures industrielles."
          }
        ],
        observer: null,
      };
    },
    mounted() {
      this.initObserver();
    },
    methods: {
      isVisible(index) {
        return this.observer?.isIntersecting || false;
      },
      initObserver() {
        const options = {
          root: null,
          threshold: 0.2,
        };
        this.observer = new IntersectionObserver(this.handleIntersection, options);
        this.$nextTick(() => {
          this.$refs.eventElement.forEach((el) => this.observer.observe(el));
        });
      },
      handleIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
    },
  };
  </script>
  
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
    border-left: 3px solid #2c3e50;
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
  