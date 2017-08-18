import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  title = 'create';
  trainingsCount = 0;
  days = [
    { 'key': 'md', 'value': 'Monday' },
    { 'key': 'tu', 'value': 'Tuesday' },
    { 'key': 'wd', 'value': 'Wednesday' },
    { 'key': 'th', 'value': 'Thursday' },
    { 'key': 'fr', 'value': 'Friday' },
    { 'key': 'sa', 'value': 'Saturday' },
    { 'key': 'su', 'value': 'Sunday' }
  ];

  sportTypeValue: string;
  searchString: string = 'Coming soon...';

  types = [
    {'value': 'run', 'viewValue': 'Run'},
    {'value': 'fitness', 'viewValue': 'Fitness'},
    {'value': 'loooong', 'viewValue': 'Tooooo long type name'},
  ];

  exercisesList = [
    {
      id: 123,
      name: 'ABS: MOUNTAIN CLIMBER WITH HANDS ON SWISS BALL',
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 233,
      name: 'GLUTES: HIP RAISE',
      description: ' It targets the muscles of your rear end, which can help make your belly flatter. The reason: When your glutes are weak—as they are in most women—the top of your pelvis tilts forward. This not only places stress on your lower back, but it causes your tummy to stick out—even if you don\'t have an ounce of fat. Your fix: the hip raise.',
      how_to: 'Lie on your back on the floor with your knees bent and your feet flat on the floor [A]. Now brace your core, squeeze your glutes, and raise your hips so your body forms a straight line from your shoulders to your knees [B]. Pause for 3 to 5 seconds—squeezing your glutes tightly the entire time—then lower back to the start.'
    },
    {
      id: 112,
      name: 'QUADRICEPS: OFFSET DUMBBELL LUNGE',
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: 'Hold a dumbbell in your right hand next to your shoulder, with your arm bent [A]. Step forward with your right leg and lower your body until your right knee is bent at least 90 degrees and your left knee nearly touches the floor [B]. Push yourself back to the starting position. That\'s 1 rep. Do all your reps, then repeat with your left leg, while holding the weight in your left hand.'
    },
    {
      id: 443,
      name: 'HAMSTRINGS: SINGLE-LEG DUMBBELL STRAIGHT-LEG DEADLIFT',
      description: 'Besides targeting your hamstrings, this exercise works your glutes and core. It also helps eliminate muscle imbalances between your legs, reducing your risk of injury. And as a bonus, it can even improve the flexibility of your hamstrings.',
      how_to: 'Grab a pair of dumbbells with an overhand grip, and hold them at arm\'s length in front your thighs. Stand with your feet shoulder-width apart and knees slightly bent. Now raise one leg off the floor [A]. Without changing the bend in your knee, bend at your hips (keep your lower back arched), and lower your torso until it\'s almost parallel to the floor [B]. Pause, then squeeze your glutes, thrust your hips forward, and raise your torso back to the start. Do all your reps, then repeat with your other leg.'
    },
  ];

  constructor() { }

  ngOnInit() {
  }
  changeTrainingCount(operation){
    if(operation == 'dec' && this.trainingsCount > 0){
      this.trainingsCount -= 1;
    } else if(operation == 'inc' && this.trainingsCount < 7){
      this.trainingsCount += 1;
    }

  }

}
