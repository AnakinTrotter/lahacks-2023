function createSession(uuid, paragraphs) {
    const sessions = localStorage.getItem('sessions');
    const values = paragraphs.map((original) => {
        return {
            original: original,
            summary: null,
            questions: null,

        }
    })

    // this is why the localStorage clears each time
    localStorage.setItem('sessions', JSON.stringify({
        [uuid]: {
            values
        }
    })
    )
    return uuid;
}

module.exports = {
    createSession
}