import * as L from 'leaflet';
// Layers Maps for Leaflet
export const LEAFLET_MAP_LAYERS = {
    'OpenStreetMap Street': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    'Mapbox Street': L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: window.mapbox_access_token
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJtYXAvbGVhZmxldC9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsMEJBQTBCO0FBQzFCLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHO0lBQzlCLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsb0RBQW9ELEVBQUU7UUFDdEYsV0FBVyxFQUFFLHlGQUF5RjtLQUN6RyxDQUFDO0lBQ0YsZUFBZSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsb0ZBQW9GLEVBQUU7UUFDL0csV0FBVyxFQUFFLHlOQUF5TjtRQUN0TyxPQUFPLEVBQUUsRUFBRTtRQUNYLEVBQUUsRUFBRSxvQkFBb0I7UUFDeEIsUUFBUSxFQUFFLEdBQUc7UUFDYixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2QsV0FBVyxFQUFHLE1BQWMsQ0FBQyxtQkFBbUI7S0FDbkQsQ0FBQztDQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5cclxuLy8gTGF5ZXJzIE1hcHMgZm9yIExlYWZsZXRcclxuZXhwb3J0IGNvbnN0IExFQUZMRVRfTUFQX0xBWUVSUyA9IHtcclxuICAgICdPcGVuU3RyZWV0TWFwIFN0cmVldCc6IEwudGlsZUxheWVyKCdodHRwczovL3tzfS50aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcclxuICAgICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xyXG4gICAgfSksXHJcbiAgICAnTWFwYm94IFN0cmVldCc6IEwudGlsZUxheWVyKCdodHRwczovL2FwaS5tYXBib3guY29tL3N0eWxlcy92MS97aWR9L3RpbGVzL3t6fS97eH0ve3l9P2FjY2Vzc190b2tlbj17YWNjZXNzVG9rZW59Jywge1xyXG4gICAgICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgJmNvcHk7IDxhIGhyZWY9XCJodHRwczovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9cIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMsIDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9cIj5NYXBib3g8L2E+JyxcclxuICAgICAgICBtYXhab29tOiAxOCxcclxuICAgICAgICBpZDogJ21hcGJveC9zdHJlZXRzLXYxMScsXHJcbiAgICAgICAgdGlsZVNpemU6IDUxMixcclxuICAgICAgICB6b29tT2Zmc2V0OiAtMSxcclxuICAgICAgICBhY2Nlc3NUb2tlbjogKHdpbmRvdyBhcyBhbnkpLm1hcGJveF9hY2Nlc3NfdG9rZW5cclxuICAgIH0pXHJcbn07XHJcbiJdfQ==