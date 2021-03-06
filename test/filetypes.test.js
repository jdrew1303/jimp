/* eslint-disable no-control-regex */

const { Jimp, getTestDir } = require('./test-helper');

describe('FileType', () => {
    const imagesDir = getTestDir() + '/samples';

    it('load PNG', done => {
        new Jimp(imagesDir + '/dice.png', function(err) {
            if (err) done(err);
            this.getPixelColor(10, 10).should.be.equal(0x00000000);
            this.getPixelColor(160, 80).should.be.equal(0x1c1cd4ff);
            this.getPixelColor(400, 250).should.be.equal(0x7e0c0cda);
            done();
        });
    });

    it('load JPG', done => {
        new Jimp(imagesDir + '/cops.jpg', function(err) {
            if (err) done(err);
            this.getPixelColor(10, 10).should.be.equal(0x3f4a02ff);
            this.getPixelColor(220, 190).should.be.equal(0x5d94b6ff);
            this.getPixelColor(350, 130).should.be.equal(0xdf7944ff);
            done();
        });
    });

    it('load JPG with fill bytes', done => {
        new Jimp(imagesDir + '/fillbytes.jpg', function(err) {
            if (err) done(err);
            this.getPixelColor(10, 10).should.be.equal(0xaeb8c3ff);
            this.getPixelColor(220, 190).should.be.equal(0x262b21ff);
            this.getPixelColor(350, 130).should.be.equal(0x4e5d30ff);
            done();
        });
    });

    it('clones with the correct MIME type', done => {
        new Jimp(imagesDir + '/cops.jpg', function(err, image) {
            if (err) done(err);
            const clone = image.clone();

            image.getMIME().should.be.equal(clone.getMIME());
            done();
        });
    });

    it('load BMP', done => {
        new Jimp(imagesDir + '/windows95.bmp', function(err) {
            if (err) done(err);
            this.getPixelColor(10, 10).should.be.equal(0xf7f7ef);
            this.getPixelColor(150, 80).should.be.equal(0xd6ad73);
            this.getPixelColor(190, 200).should.be.equal(0xc3f7);
            done();
        });
    });

    it('load TIFF', done => {
        new Jimp(imagesDir + '/rgb.tiff', function(err) {
            if (err) done(err);
            this.getPixelColor(10, 10).should.be.equal(0xa4988bff);
            this.getPixelColor(220, 190).should.be.equal(0xe0d7ddff);
            this.getPixelColor(350, 130).should.be.equal(0x565433ff);
            done();
        });
    });

    const simpleJGD = {
        width: 3,
        height: 3,
        data: [
            0xff0000ff,
            0xff0080ff,
            0xff00ffff,
            0xff0080ff,
            0xff00ffff,
            0x8000ffff,
            0xff00ffff,
            0x8000ffff,
            0x0000ffff
        ]
    };

    it('export PNG', done => {
        new Jimp(simpleJGD, function(err) {
            if (err) done(err);
            this.getBuffer('image/png', (err, buffer) => {
                if (err) done(err);
                buffer.toString().should.match(/^.PNG\r\n/);
                done();
            });
        });
    });

    it('export JPG', done => {
        new Jimp(simpleJGD, function(err) {
            if (err) done(err);
            this.getBuffer('image/jpeg', (err, buffer) => {
                if (err) done(err);
                buffer.toString().should.match(/^.{3,9}JFIF\u0000/);
                done();
            });
        });
    });

    it('export BMP', done => {
        new Jimp(simpleJGD, function(err) {
            if (err) done(err);
            this.getBuffer('image/bmp', (err, buffer) => {
                if (err) done(err);
                buffer.toString().should.match(/^BMZ\u0000/);
                done();
            });
        });
    });

    it('export TIFF', done => {
        new Jimp(simpleJGD, function(err) {
            if (err) done(err);
            this.getBuffer('image/tiff', (err, buffer) => {
                if (err) done(err);
                buffer.toString().should.match(/^MM\u0000*\u0000/);
                done();
            });
        });
    });
});
