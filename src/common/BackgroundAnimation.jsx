import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

function BackgroundAnimation() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numberOfParticles = 65; // Increased number of particles
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1.5, // Increased particle size
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          hue: Math.random() * 80 - 40, // Wider color variation
          pulse: 0,
          pulseSpeed: 0.02 + Math.random() * 0.02 // For pulsing effect
        });
      }
      particlesRef.current = particles;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        const distanceToMouse = Math.hypot(
          particle.x - mouseRef.current.x,
          particle.y - mouseRef.current.y
        );
        
        const maxDistance = 200;
        const influence = Math.max(0, 1 - distanceToMouse / maxDistance);
        
        // Update particle position
        particle.x += particle.speedX + (mouseRef.current.x - particle.x) * influence * 0.02;
        particle.y += particle.speedY + (mouseRef.current.y - particle.y) * influence * 0.02;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update pulse
        particle.pulse = (particle.pulse + particle.pulseSpeed) % (Math.PI * 2);
        const pulseFactor = document.body.dataset.theme === 'dark' 
          ? (0.5 + Math.sin(particle.pulse) * 0.3)
          : (0.7 + Math.sin(particle.pulse) * 0.4);

        // Draw glow effect
        const baseHue = document.body.dataset.theme === 'dark' ? 220 : 190;
        const hue = baseHue + particle.hue;
        const saturation = document.body.dataset.theme === 'dark' ? '85%' : '95%';
        const lightness = document.body.dataset.theme === 'dark' ? '60%' : '82%';
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * (1.5 + influence * 2.5)
        );
        
        // Brighter core - increased opacity for light mode
        const coreOpacity = document.body.dataset.theme === 'dark' 
          ? (0.4 + influence * 0.5)
          : (0.6 + influence * 0.6);
        
        // Mid gradient with slight color shift - increased opacity for light mode
        const midOpacity = document.body.dataset.theme === 'dark' 
          ? (0.2 + influence * 0.3)
          : (0.35 + influence * 0.4);
        
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}, ${lightness}, ${coreOpacity * pulseFactor})`);
        gradient.addColorStop(0.5, `hsla(${hue + 15}, ${saturation}, ${lightness}, ${midOpacity * pulseFactor})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * (1.5 + influence * 2.5), 0, Math.PI * 2);
        ctx.fill();
        
        // Add extra glow layer
        const glowSize = particle.size * (2 + influence * 3);
        const outerGlow = ctx.createRadialGradient(
          particle.x, particle.y, glowSize * 0.5,
          particle.x, particle.y, glowSize
        );
        const glowOpacity = document.body.dataset.theme === 'dark' 
          ? 0.1
          : 0.2;
        outerGlow.addColorStop(0, `hsla(${hue}, ${saturation}, ${lightness}, ${glowOpacity * pulseFactor})`);
        outerGlow.addColorStop(1, 'transparent');
        
        ctx.fillStyle = outerGlow;
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = document.body.dataset.theme === 'dark' 
        ? 'rgba(150, 180, 255, 0.08)'
        : 'rgba(100, 150, 255, 0.18)';
      ctx.lineWidth = document.body.dataset.theme === 'dark' ? 0.8 : 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < 100) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Initialize
    resizeCanvas();
    createParticles();
    drawParticles();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-animation" />;
}

export default BackgroundAnimation;