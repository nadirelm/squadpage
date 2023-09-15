let padding = { top: 20, right: 40, bottom: 0, left: 0 },
w = 450 - padding.left - padding.right,
h = 450 - padding.top - padding.bottom,
r = Math.min(w, h) / 2,
rotation = 0,
oldrotation = 0,
picked = 100000,
oldpick = [],
color = d3.scale.category20();
let data = [
{
    label: "Tom",
    value: 1,
    question: "Tom",
    link: "https://tomdeeterink1.github.io/your-tribe-profile-card/"
},
{
    label: "Nadir",
    value: 2,
    question: "Nadir",
    link: "https://nadirelm.github.io/your-tribe-profile-card/"
},
{
    label: "Lesley",
    value: 3,
    question: "Lesley",
    link: "https://rubenerhardt.github.io/your-tribe-profile-card/"
},
{
    label: "Yu Jing",
    value: 4,
    question: "Yu Jing",
    link: "https://yujing-student.github.io/your-tribe-profile-card/"
},
{
    label: "Anne",
    value: 5,
    question: "Anne",
    link: "https://annevd.github.io/your-tribe-profile-card/"
},
{
    label: "Lisa",
    value: 6,
    question: "Lisa",
    link: "https://lisagjh.github.io/your-tribe-profile-card/profilecard-versie-2/versie2.html"
},
{
    label: "Nadira",
    value: 3,
    question: "Nadira",
    link: "https://naddybs.github.io/your-tribe-profile-card/"
},
{
    label: "Mirac",
    value: 3,
    question: "Mirac",
    link: "https://miracc38.github.io/your-tribe-profile-card/"
},
{
    label: "Jaap",
    value: 3,
    question: "Jaap",
    link: "https://treppord.github.io/your-tribe-profile-card/"
},
{
    label: "Sascha",
    value: 3,
    question: "Sascha",
    link: "https://saschavanvliet.github.io/your-tribe-profile-card/"
},
{
    label: "Zainab",
    value: 3,
    question: "Zainab",
    link: "http://zainablfz.github.io/your-tribe-profile-card/"
},
{
    label: "Ruben",
    value: 3,
    question: "Ruben",
    link: "https://rubenerhardt.github.io/your-tribe-profile-card/"
},
{
    label: "Koen",
    value: 3,
    question: "Koen",
    link: "https://koeenm.github.io/your-tribe-profile-card/"
},
{
    label: "Ryan",
    value: 3,
    question: "Ryan",
    link: "https://ryank2004.github.io/your-tribe-profile-card/"
},
{
    label: "Sam",
    value: 3,
    question: "Sam",
    link: "https://samarafelladina.github.io/your-tribe-profile-card/"
},
{
    label: "Riley",
    value: 3,
    question: "Riley",
    link: "https://rileyesther.github.io/your-tribe-profile-card/"
}
];
let svg = d3
.select("#chart")
.append("svg")
.data([data])
.attr("width", w + padding.left + padding.right)
.attr("height", h + padding.top + padding.bottom);
let container = svg
.append("g")
.attr("class", "chartholder")
.attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
);
let vis = container.append("g");

let pie = d3.layout
.pie()
.sort(null)
.value(function (d) {
    return 1;
});
// declare an arc generator function
let arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
let arcs = vis
.selectAll("g.slice")
.data(pie)
.enter()
.append("g")
.attr("class", "slice");

arcs
.append("path")
.attr("fill", function (d, i) {
    return color(i);
})
.attr("d", function (d) {
    return arc(d);
});
// add the text
arcs
.append("text")
.attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
        "rotate(" +
        ((d.angle * 180) / Math.PI - 90) +
        ")translate(" +
        (d.outerRadius - 10) +
        ")"
    );
})
.attr("text-anchor", "end")
.text(function (d, i) {
    return data[i].label;
});
container.on("click", spin);
function spin(d) {
container.on("click", null);
//all slices have been seen, all done
console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
if (oldpick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
}
let ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

rotation = Math.round(rng / ps) * ps;

picked = Math.round(data.length - (rotation % 360) / ps);
picked = picked >= data.length ? picked % data.length : picked;
if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
} else {
    oldpick.push(picked);
}
rotation += 90 - Math.round(ps / 2);
vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {

        //KLEUR VERANDERD ALS DEZE WORD GESELECTEERD.
        d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
            "fill",
            "#D4AF37"
        );
        //populate question
        d3.select("#question h1").text(data[picked].question).on("click", window.open(data[picked].link));
        oldrotation = rotation;

        console.log(data[picked].value);


        container.on("click", spin);
    });
}
//make arrow
svg
.append("g")
.attr(
    "transform",
    "translate(" +
    (w + padding.left + padding.right) +
    "," +
    (h / 2 + padding.top) +
    ")"
)
.append("path")
.attr("d", "M-" + r * 0.35 + ",0L0," + r * 0.10 + "L0,-" + r * 0.10 + "Z")
.style({ fill: "#D4AF37" });
//PIJL
container
.append("circle")
.attr("cx", 0)
.attr("cy", 0)
.attr("r", 60)
.style({ fill: "#D4AF37", cursor: "pointer" });
//TEXT IN HET RAT
container
.append("text")
.attr("x", 0)
.attr("y", 0)
.attr("text-anchor", "middle")
.text("Spin the wheel")
.style({ "font-weight": "bold", "font-size": "15px" });

function rotTween(to) {
let i = d3.interpolate(oldrotation % 360, rotation);
return function (t) {
    return "rotate(" + i(t) + ")";
};
}

function getRandomNumbers() {
let array = new Uint16Array(1000);
let scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
) {
    window.crypto.getRandomValues(array);
    console.log("works");
} else {
    //no support for crypto, get crappy random numbers
    for (let i = 0; i < 1000; i++) {
        array[i] = Math.floor(Math.random() * 100000) + 1;
    }
}
return array;
}


const dropdown = document.querySelector('.drop')
dropdown.addEventListener('click', showbackcard)

const dropdownField = document.querySelector('.dropdown-field')

function showbackcard (event) {
    console.log(event.target)
    dropdownField.classList.toggle('visible')
}