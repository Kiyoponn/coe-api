const characters = [
    {
        name: 'Airi Sakura',
        nicknames: 'Shizuku',
        image: 'images/airi.png',
    },
    {
        name: 'Akane Tachibana',
        nicknames: undefined,
        image: 'images/akane.png',
    },
    {
        name: 'Akito Miyake',
        nicknames: 'Miyatchi',
        image: 'images/akito.png'
    }
]

const characteristics = [
    {
        gender: 'female',
        age: 16,
        dateOfBirth: '15-10-2005',
        height: 153,
        hairColor: 'pink',
        eyeColor: 'gradient blue',
    },
    {
        gender: 'female',
        age: 18,
        dateOfBirth: '06-05-2003',
        height: 155,
        hairColor: 'lilac',
        eyeColor: 'peach',
    },
    {
        gender: 'male',
        age: 17,
        dateOfBirth: '13-07-2004',
        height: undefined,
        hairColor: 'dark magenta',
        eyeColor: undefined,
    }
]

const professionalstatus = [
    {
        studentId: 'S01T004738',
        class: '1-D',
        club: undefined,
        group: 'Ayanokoji Group',
        occupation: 'Student',
        affiliation: 'Advanced Nurturing High School',
    },
    {
        studentId: 'S01T004461',
        class: '3-A',
        club: undefined,
        group: 'Student Council',
        occupation: 'Student',
        affiliation: 'Advanced Nurturing High School',
    },
    {
        studentId: 'S01T004700',
        class: '1-D',
        club: 'Archery Club',
        group: 'Ayanokoji Group',
        occupation: 'Student',
        affiliation: 'Advanced Nurturing High School'
    },
]

module.exports = {
    characters,
    characteristics,
    professionalstatus
}
