'use strict';

var url = window.location.href;
var title = document.title;

var data = {
  url: url,
  title: title
};

var request = new XMLHttpRequest();
request.open('POST', 'http://localhost:3000/api/chrome', true);
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
request.send(JSON.stringify(data));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2Nocm9tZS9jb250ZW50LmpzIl0sIm5hbWVzIjpbInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRpdGxlIiwiZG9jdW1lbnQiLCJkYXRhIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxNQUFNQyxPQUFPQyxRQUFQLENBQWdCQyxJQUE1QjtBQUNBLElBQU1DLFFBQVFDLFNBQVNELEtBQXZCOztBQUVBLElBQU1FLE9BQU87QUFDWE4sVUFEVztBQUVYSTtBQUZXLENBQWI7O0FBS0EsSUFBTUcsVUFBVSxJQUFJQyxjQUFKLEVBQWhCO0FBQ0FELFFBQVFFLElBQVIsQ0FBYSxNQUFiLEVBQXFCLGtDQUFyQixFQUF5RCxJQUF6RDtBQUNBRixRQUFRRyxnQkFBUixDQUF5QixjQUF6QixFQUF5QyxpQ0FBekM7QUFDQUgsUUFBUUksSUFBUixDQUFhQyxLQUFLQyxTQUFMLENBQWVQLElBQWYsQ0FBYiIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5jb25zdCB0aXRsZSA9IGRvY3VtZW50LnRpdGxlO1xuXG5jb25zdCBkYXRhID0ge1xuICB1cmwsXG4gIHRpdGxlLFxufTtcblxuY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xucmVxdWVzdC5vcGVuKCdQT1NUJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvY2hyb21lJywgdHJ1ZSk7XG5yZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04Jyk7XG5yZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuIl19